import { ExpenseSplit } from "./ExpenseSplit";
import { ExpenseSplitId } from "./ExpenseSplitId";
import { ExpenseId } from "./ExpenseId";
import { UserId } from "../user/UserId";

export interface CreateExpenseSplitData {
  expenseId: ExpenseId;
  userId: UserId;
  amount: number;
  percentage?: number;
  isSettled?: boolean;
}

export interface ExpenseSplitRepository {
  createExpenseSplit(data: CreateExpenseSplitData): Promise<ExpenseSplit>;

  getExpenseSplitsByExpenseId(expenseId: ExpenseId): Promise<ExpenseSplit[]>;

  getExpenseSplitsByExpenseIds(expenseIds: ExpenseId[]): Promise<ExpenseSplit[]>;

  getExpenseSplitsByUserId(userId: UserId): Promise<ExpenseSplit[]>;

  deleteExpenseSplits(expenseId: ExpenseId): Promise<boolean>;
}
