import { expenseRepository } from "../../../database/mongo/expense/expenseRepository";
import { expenseSplitRepository } from "../../../database/mongo/expense/expenseSplitRepository";
import { groupRepository } from "../../../database/mongo/group/groupRepository";
import { Expense } from "../../../entities/expense/Expense";
import { ExpenseId } from "../../../entities/expense/ExpenseId";
import { UpdateExpenseData } from "../../../entities/expense/ExpenseRepository";
import { CreateExpenseSplitData } from "../../../entities/expense/ExpenseSplitRepository";
import { GroupId } from "../../../entities/group/GroupId";
import { UserId } from "../../../entities/user/UserId";

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
  // total amount validation
  if (typeof payload.totalAmount !== "number" || payload.totalAmount <= 0) {
    throw Object.assign(new Error("Total amount must be positive"), {
      name: "ValidationError",
    });
  }

  //
  if (!payload.splits?.length) {
    throw Object.assign(new Error("At least one participant is required"), {
      name: "ValidationError",
    });
  }

  const gid = new GroupId(groupId);
  const payerId = new UserId(requesterId);
  const eid = new ExpenseId(expenseId);

  const expense = await expenseRepository.getExpenseById(eid);
  if (!expense) {
    throw Object.assign(new Error("Expense Not Found!"));
  }

  const groupMembers = await groupRepository.findAllGroupMembers(gid);
  if (!groupMembers || groupMembers.length === 0) {
    throw Object.assign(new Error("Group Not Found!"), {
      name: "GroupNotFoundError",
    });
  }

  // make split users id set
  const splitMembersId = new Set(groupMembers.map((m) => m._userId.toString()));

  // check payer is a member of group
  if (!splitMembersId.has(payerId.toString())) {
    throw Object.assign(new Error("You are not a member of this group"), {
      name: "ForbiddenError",
    });
  }

  // make invalid splits
  const invalidSplits = payload.splits.filter(
    (s) => !splitMembersId.has(s.userId.toString())
  );

  if (invalidSplits.length > 0) {
    throw Object.assign(
      new Error("One or more split members are not the members of this group"),
      {
        name: "ValidationError",
      }
    );
  }

  const splitType = String(payload.splitType);

  if (
    splitType !== "equal" &&
    splitType !== "percentage" &&
    splitType !== "exact"
  ) {
    throw Object.assign(new Error("Invalid split type"), {
      name: "ValidationError",
    });
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
      payload.totalAmount ?? expense.totalAmount,
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

  if (splitType === "equal") {
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