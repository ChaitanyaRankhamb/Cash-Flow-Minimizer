import { expenseRepository } from "../../database/mongo/expense/expenseRepository";
import { expenseSplitRepository } from "../../database/mongo/expense/expenseSplitRepository";
import { groupRepository } from "../../database/mongo/group/groupRepository";
import { GroupId } from "../../entities/group/GroupId";
import { UserId } from "../../entities/user/UserId";
import { Expense } from "../../entities/expense/Expense";
import { ExpenseSplit } from "../../entities/expense/ExpenseSplit";
import { ExpenseId } from "../../entities/expense/ExpenseId";

export interface BalanceData {
  userId: UserId;
  netBalance: number;
  role: "CREDITOR" | "DEBTOR" | "SETTLED";
}

export const groupBalanceService = async ({
  groupId,
  requesterId,
}: {
  groupId: GroupId;
  requesterId: UserId;
}): Promise<BalanceData[]> => {
  console.log("Checking group existence for", groupId.toString());
  // Validate group exists
  const groupExists = await groupRepository.exists(groupId);
  if (!groupExists) {
    const error = new Error("Group not found");
    error.name = "GroupNotFoundError";
    throw error;
  }

  console.log("Checking membership for", requesterId.toString());
  // Validate user membership
  const isMember = await groupRepository.findGroupMember(groupId, requesterId);

  if (!isMember) {
    const error = new Error("User is not a member of the group");
    error.name = "UserNotGroupMemberError";
    throw error;
  }

  console.log("Fetching expenses...");
  // Fetch expenses (single query)
  const expenses = await expenseRepository.getExpensesByGroup(groupId);
  console.log("Expenses found:", expenses.length);

  // Fetch all splits in ONE query
  const expenseIds: ExpenseId[] = expenses.map((e) => e._id);
  console.log("Fetching splits for expense IDs:", expenseIds.length);

  const splits =
    await expenseSplitRepository.getExpenseSplitsByExpenseIds(expenseIds);
  console.log("Splits found:", splits.length);

  // Compute balances (PURE)
  const balanceMap = computeNetBalances(expenses, splits);

  // Convert to DTO
  const balances: BalanceData[] = [];

  for (const [userId, net] of balanceMap.entries()) {
    let role: BalanceData["role"];
    if (net > 0) role = "CREDITOR";
    else if (net < 0) role = "DEBTOR";
    else role = "SETTLED";

    balances.push({
      userId: new UserId(userId),
      netBalance: net,
      role,
    });
  }

  return balances;
};

export const computeNetBalances = (
  expenses: Expense[],
  splits: ExpenseSplit[],
): Map<string, number> => {
  const balanceMap: Map<string, number> = new Map();

  // 1. Credit payers
  for (const expense of expenses) {
    const payerId = expense.paidBy.toString();
    const prev = balanceMap.get(payerId) ?? 0;
    balanceMap.set(payerId, +(prev + expense.totalAmount).toFixed(2));
  }

  // 2. Debit split users
  for (const split of splits) {
    const userId = split.userId.toString();
    const prev = balanceMap.get(userId) ?? 0;
    balanceMap.set(userId, +(prev - split.amount).toFixed(2));
  }

  return balanceMap;
};
