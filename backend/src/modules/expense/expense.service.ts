import { getExpensesByGroupController } from "./expense.controller";
import {
  CreateExpenseData,
  UpdateExpenseData,
} from "../../entities/expense/ExpenseRepository";
import { Types } from "mongoose";

import {
  expenseRepository,
  expenseRepository as IExpenseRepository,
} from "../../database/mongo/expense/expenseRepository";
import { Expense } from "../../entities/expense/Expense";
import { resolve } from "path";
import { expenseSplitRepository } from "../../database/mongo/expense/expenseSplitRepository";
import { CreateExpenseSplitData } from "../../entities/expense/ExpenseSplitRepository";
import { ExpenseId } from "../../entities/expense/ExpenseId";
import { GroupId } from "../../entities/group/GroupId";

// utility for financial rounding
const round2 = (n: number): number => Math.round(n * 100) / 100;

export const createExpenseService = async (
  data: CreateExpenseData,
): Promise<Expense> => {
  // validations
  if (data.totalAmount <= 0) {
    throw new Error("Total amount must be positive");
  }

  if (!data.splits || data.splits.length === 0) {
    throw new Error("At least one participant is required");
  }

  // Normalize splitType - handle both string and object formats
  let normalizedSplitType = data.splitType;
  if (typeof data.splitType === "string") {
    normalizedSplitType =
      data.splitType === "equal"
        ? { equal: data.splitType }
        : data.splitType === "percentage"
          ? { percentage: data.splitType }
          : { exact: data.splitType };
  }

  const splitModes = [
    normalizedSplitType?.equal,
    normalizedSplitType?.percentage,
    normalizedSplitType?.exact,
  ].filter(Boolean);

  if (splitModes.length !== 1) {
    throw new Error(
      `Exactly one split type must be selected. Received: ${JSON.stringify(data.splitType)}`,
    );
  }

  // create expense
  const expense = await expenseRepository.createExpense(data);

  const splitsToCreate: CreateExpenseSplitData[] = [];

  // Equal split
  if (normalizedSplitType?.equal) {
    const baseAmount = round2(data.totalAmount / data.splits.length);
    let remainder = round2(data.totalAmount);

    for (let i = 0; i < data.splits.length; i++) {
      const split = data.splits[i];
      if (!split) continue;

      const amount = i === data.splits.length - 1 ? remainder : baseAmount;

      remainder = round2(remainder - amount);

      splitsToCreate.push({
        expenseId: expense._id,
        userId: split.userId,
        amount,
      });
    }
  }

  // percentage split
  if (normalizedSplitType?.percentage) {
    const totalPercentage = data.splits.reduce((sum, s) => sum + s.value, 0);

    if (totalPercentage !== 100) {
      throw new Error("Total percentage must be exactly 100");
    }

    let remainder = round2(data.totalAmount);

    for (let i = 0; i < data.splits.length; i++) {
      const split = data.splits[i];
      if (!split) continue;

      const amount =
        i === data.splits.length - 1
          ? remainder
          : round2((data.totalAmount * split.value) / 100);

      remainder = round2(remainder - amount);

      splitsToCreate.push({
        expenseId: expense._id,
        userId: split.userId,
        amount,
        percentage: split.value,
      });
    }
  }

  // Exact split
  if (normalizedSplitType?.exact) {
    const totalExact = round2(data.splits.reduce((sum, s) => sum + s.value, 0));

    if (totalExact !== round2(data.totalAmount)) {
      throw new Error("Exact split total does not match expense amount");
    }

    for (const split of data.splits) {
      splitsToCreate.push({
        expenseId: expense._id,
        userId: split.userId,
        amount: round2(split.value),
      });
    }
  }

  // create splits
  for (const split of splitsToCreate) {
    await expenseSplitRepository.createExpenseSplit(split);
  }

  return expense;
};

export const getExpensesByGroupService = async (
  groupIdStr: string,
): Promise<Expense[]> => {
  if (!groupIdStr) {
    throw new Error("GroupId is required");
  }

  const groupId = new GroupId(groupIdStr);

  const expenses = await expenseRepository.getExpensesByGroup(groupId);

  return expenses ?? [];
};

export const getExpenseByIdService = async (
  expenseId: string,
): Promise<Expense | null> => {
  if (!expenseId) {
    throw new Error("ExpenseId is required");
  }

  const eid = new ExpenseId(expenseId);
  return expenseRepository.getExpenseById(eid);
};

export const updateExpenseService = async (
  data: UpdateExpenseData,
): Promise<Expense | null> => {
  // validation
  if (!data.expenseId) {
    throw new Error("Expense id must be required!");
  }

  if (!data.groupId) {
    throw new Error("GroupId is required");
  }

  if (data.totalAmount !== undefined && data.totalAmount <= 0) {
    throw new Error("Total amount must be positive");
  }

  const eid = data.expenseId;
  const gid = data.groupId;

  // check expense exist with gid & eid or not
  const existingExpense = await expenseRepository.getExpenseById(eid);

  if (!existingExpense) {
    return null;
  }

  // update core fields
  const updatedExpense = await expenseRepository.updateExpense({
    expenseId: eid,
    groupId: gid,
    ...(data.paidBy && { paidBy: data.paidBy }),
    ...(data.title && { title: data.title }),
    ...(data.totalAmount !== undefined && { totalAmount: data.totalAmount }),
    ...(data.splitType && { splitType: data.splitType }),
  });

  if (!updatedExpense) {
    return null;
  }

  // splits updation
  if (data.splits && data.splitType) {
    // Normalize splitType - handle both string and object formats
    let normalizedSplitType = data.splitType;
    if (typeof data.splitType === "string") {
      normalizedSplitType =
        data.splitType === "equal"
          ? { equal: data.splitType }
          : data.splitType === "percentage"
            ? { percentage: data.splitType }
            : { exact: data.splitType };
    }

    // remove old splits
    const isRemoved =await expenseSplitRepository.deleteExpenseSplits(eid);
    if(!isRemoved){
      console.log("No splits removed:", eid.toString());
    }

    const splitsToCreate: CreateExpenseSplitData[] = [];
    const splits = data.splits;
    const totalAmount = data.totalAmount ?? existingExpense?.totalAmount;

    /* ----- enforce single split type ----- */
    const splitModes = [
      normalizedSplitType.equal,
      normalizedSplitType.percentage,
      normalizedSplitType.exact,
    ].filter(Boolean);

    if (splitModes.length !== 1) {
      throw new Error("Exactly one split type must be selected");
    }

    /* ----- equal split ----- */
    if (normalizedSplitType.equal) {
      const baseAmount = round2(totalAmount / splits.length);
      let remainder = round2(totalAmount);

      for (let i = 0; i < splits.length; i++) {
        const split = data.splits[i];
        const amount = i === splits.length - 1 ? remainder : baseAmount;

        remainder = round2(remainder - amount);

        if (split) {
          splitsToCreate.push({
            expenseId: eid,
            userId: split.userId,
            amount,
          });
        }
      }
    }

    /* ----- percentage split ----- */
    if (normalizedSplitType.percentage) {
      const totalPercentage = splits.reduce((sum, s) => sum + s.value, 0);

      if (totalPercentage !== 100) {
        throw new Error("Total percentage must be 100");
      }

      let remainder = round2(totalAmount);

      for (let i = 0; i < splits.length; i++) {
        const split = data.splits[i];
        const amount =
          i === splits.length - 1
            ? remainder
            : round2(
                (totalAmount *
                  (split && split.value !== undefined ? split.value : 0)) /
                  100,
              );

        remainder = round2(remainder - amount);

        if (split) {
          splitsToCreate.push({
            expenseId: eid,
            userId: split.userId,
            amount,
            percentage: split.value !== undefined ? split.value : 0,
          });
        }
      }
    }

    /* ----- exact split ----- */
    if (normalizedSplitType.exact) {
      const totalExact = round2(splits.reduce((sum, s) => sum + s.value, 0));

      if (totalExact !== round2(totalAmount)) {
        throw new Error("Exact split total mismatch");
      }

      for (const s of splits) {
        splitsToCreate.push({
          expenseId: eid,
          userId: s.userId,
          amount: round2(s.value),
        });
      }
    }

    /* ----- persist new splits ----- */
    for (const split of splitsToCreate) {
      await expenseSplitRepository.createExpenseSplit(split);
    }
  }

  return updatedExpense;
};

export const deleteExpenseService = async (
  expenseId: string,
  groupId: string,
): Promise<boolean> => {
  // check validation
  if (!expenseId || !groupId) {
    throw new Error("Expense id & Group id must required!");
  }

  const gid = new GroupId(groupId);
  const eid = new ExpenseId(expenseId);

  // check expense exist with gid and eid
  const existingExpense = await expenseRepository.getExpenseByIdAndGroup(
    gid,
    eid,
  );

  if (!existingExpense) {
    return false;
  }

  // delete all splits of this expense
  await expenseSplitRepository.deleteExpenseSplits(eid);

  // delete expense
  await expenseRepository.deleteExpense(gid, eid);

  return true;
};
