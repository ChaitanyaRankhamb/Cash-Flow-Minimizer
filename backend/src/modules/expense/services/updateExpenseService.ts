import { expenseRepository } from "../../../database/mongo/expense/expenseRepository";
import { expenseSplitRepository } from "../../../database/mongo/expense/expenseSplitRepository";
import { Expense } from "../../../entities/expense/Expense";
import { ExpenseId } from "../../../entities/expense/ExpenseId";
import { UpdateExpenseData } from "../../../entities/expense/ExpenseRepository";
import { CreateExpenseSplitData } from "../../../entities/expense/ExpenseSplitRepository";
import { GroupId } from "../../../entities/group/GroupId";

const round2 = (n: number): number => Math.round(n * 100) / 100;

export const updateExpenseService = async ({
  groupId,
  expenseId,
  requesterId,
  payload,
}: {
  groupId: string;
  expenseId: string;
  requesterId: string;
  payload: UpdateExpenseData;
}): Promise<Expense> => {
  const gid = new GroupId(groupId);
  const eid = new ExpenseId(expenseId);

  const existing = await expenseRepository.getExpenseByIdAndGroup(gid, eid);
  if (!existing) {
    throw Object.assign(new Error("Expense not found"), {
      name: "ExpenseNotFoundError",
    });
  }

  if (payload.totalAmount !== undefined && payload.totalAmount <= 0) {
    throw Object.assign(new Error("Total amount must be positive"), {
      name: "ValidationError",
    });
  }

  // Normalize splitType (string → object form), fallback to existing if needed
  let splitType = payload.splitType;
  if (splitType) {
    if (typeof splitType === "string") {
      splitType =
        splitType === "equal"
          ? { equal: splitType }
          : splitType === "percentage"
            ? { percentage: splitType }
            : { exact: splitType };
    }
  } else {
    splitType = existing.splitType;
  }

  // Enforce only one split type if updating splits & split type
  if (payload.splits && splitType) {
    const splitModes = [
      splitType.equal,
      splitType.percentage,
      splitType.exact,
    ].filter(Boolean);
    if (splitModes.length !== 1) {
      throw Object.assign(new Error("Exactly one split type must be selected"), {
        name: "ValidationError",
      });
    }
  }

  const updated = await expenseRepository.updateExpense({
    ...payload,
    expenseId: eid,
    groupId: gid,
    splitType,
  });

  if (!updated) {
    throw new Error("Expense update failed");
  }

  if (payload.splits && payload.splitType) {
    await recreateSplits(
      eid,
      payload.splits,
      payload.totalAmount ?? existing.totalAmount,
      splitType,
    );
  }

  return updated;
};

const recreateSplits = async (
  expenseId: ExpenseId,
  splits: any[],
  totalAmount: number,
  splitType: any,
) => {
  await expenseSplitRepository.deleteExpenseSplits(expenseId);

  const toCreate: CreateExpenseSplitData[] = [];

  if (splitType.equal) {
    const base = round2(totalAmount / splits.length);
    let remainder = round2(totalAmount);

    splits.forEach((s, i) => {
      const amount = i === splits.length - 1 ? remainder : base;
      remainder = round2(remainder - amount);

      toCreate.push({ expenseId, userId: s.userId, amount });
    });
  }

  if (splitType.percentage) {
    const sum = splits.reduce((t, s) => t + (s.value ?? 0), 0);
    if (sum !== 100) {
      throw Object.assign(new Error("Total percentage must be 100"), {
        name: "ValidationError",
      });
    }

    let remainder = round2(totalAmount);

    splits.forEach((s, i) => {
      const amount =
        i === splits.length - 1
          ? remainder
          : round2((totalAmount * s.value) / 100);

      remainder = round2(remainder - amount);

      toCreate.push({
        expenseId,
        userId: s.userId,
        amount,
        percentage: s.value,
      });
    });
  }

  if (splitType.exact) {
    const sum = round2(splits.reduce((t, s) => t + s.value, 0));
    if (sum !== round2(totalAmount)) {
      throw Object.assign(new Error("Exact split total mismatch"), {
        name: "ValidationError",
      });
    }

    splits.forEach((s) =>
      toCreate.push({
        expenseId,
        userId: s.userId,
        amount: round2(s.value),
      }),
    );
  }

  for (const s of toCreate) {
    await expenseSplitRepository.createExpenseSplit(s);
  }
};