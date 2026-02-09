import { expenseRepository } from "../../../database/mongo/expense/expenseRepository";
import { Expense } from "../../../entities/expense/Expense";
import { GroupId } from "../../../entities/group/GroupId";

export const getExpensesByGroupService = async ({
  groupId,
  requesterId,
}: {
  groupId: string;
  requesterId: string;
}): Promise<Expense[]> => {
  const gid = new GroupId(groupId);

  return expenseRepository.getExpensesByGroup(gid);
};