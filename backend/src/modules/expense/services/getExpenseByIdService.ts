import { expenseRepository } from "../../../database/mongo/expense/expenseRepository";
import { Expense } from "../../../entities/expense/Expense";
import { ExpenseId } from "../../../entities/expense/ExpenseId";

export const getExpenseByIdService = async ({
  expenseId,
  requesterId,
}: {
  expenseId: string;
  requesterId: string;
}): Promise<Expense> => {
  const eid = new ExpenseId(expenseId);

  const expense = await expenseRepository.getExpenseById(eid);

  if (!expense) {
    throw Object.assign(new Error("Expense not found"), {
      name: "ExpenseNotFoundError",
    });
  }

  return expense;
};