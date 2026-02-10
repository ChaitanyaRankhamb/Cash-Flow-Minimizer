import { expenseRepository } from "../../database/mongo/expense/expenseRepository";
import { expenseSplitRepository } from "../../database/mongo/expense/expenseSplitRepository";
import { groupRepository } from "../../database/mongo/group/groupRepository";
import { settlementRepository } from "../../database/mongo/settlement/settlementRepository";
import { GroupId } from "../../entities/group/GroupId";
import { UserId } from "../../entities/user/UserId";
import { ExpenseId } from "../../entities/expense/ExpenseId";
import { computeNetBalances } from "./computeNetBalanceService";

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
  // Validate group exists
  const groupExists = await groupRepository.exists(groupId);
  if (!groupExists) {
    const error = new Error("Group not found");
    error.name = "GroupNotFoundError";
    throw error;
  }

  // Validate user membership
  const isMember = await groupRepository.findGroupMember(
    groupId,
    requesterId,
  );

  if (!isMember) {
    const error = new Error("User is not a member of the group");
    error.name = "UserNotGroupMemberError";
    throw error;
  }

  // Fetch expenses (single query)
  const expenses = await expenseRepository.getExpensesByGroup(groupId);

  // Fetch all splits in ONE query
  const expenseIds: ExpenseId[] = expenses.map((e) => e._id);

  const splits =
    await expenseSplitRepository.getExpenseSplitsByExpenseIds(expenseIds);

  // Fetch settlements
  const settlements = await settlementRepository.findSettlementsByGroup(groupId);

  // Compute balances (PURE)
  const balanceMap = computeNetBalances(expenses, splits, settlements);

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
