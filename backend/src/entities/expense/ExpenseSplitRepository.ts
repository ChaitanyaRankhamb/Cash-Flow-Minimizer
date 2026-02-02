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

  getExpenseSplitById(expenseSplitId: ExpenseSplitId): Promise<ExpenseSplit | null>;

  getExpenseSplitsByExpenseId(expenseId: ExpenseId): Promise<ExpenseSplit[]>;

  getExpenseSplitsByUserId(userId: UserId): Promise<ExpenseSplit[]>;

  markExpenseSplitAsSettled(expenseSplitId: ExpenseSplitId): Promise<ExpenseSplit>;

  deleteExpenseSplit(expenseSplitId: ExpenseSplitId): Promise<void>;
}
