import { expenseRepository } from "../../../database/mongo/expense/expenseRepository";
import { expenseSplitRepository } from "../../../database/mongo/expense/expenseSplitRepository";
import { ExpenseId } from "../../../entities/expense/ExpenseId";
import { GroupId } from "../../../entities/group/GroupId";

export const deleteExpenseService = async ({
  groupId,
  expenseId,
  requesterId,
}: {
  groupId: string;
  expenseId: string;
  requesterId: string;
}): Promise<void> => {
  const gid = new GroupId(groupId);
  const eid = new ExpenseId(expenseId);

  const existing = await expenseRepository.getExpenseByIdAndGroup(gid, eid);
  if (!existing) {
    throw Object.assign(new Error("Expense not found"), {
      name: "ExpenseNotFoundError",
    });
  }

  await expenseSplitRepository.deleteExpenseSplits(eid);
  await expenseRepository.deleteExpense(gid, eid);
};