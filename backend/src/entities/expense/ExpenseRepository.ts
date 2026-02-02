import { GroupId } from "../group/GroupId";
import { UserId } from "../user/UserId";
import { Expense } from "./Expense";
import { ExpenseId } from "./ExpenseId";

export interface CreateExpenseData {
  groupId: GroupId;
  paidBy: UserId;
  title?: string,
  totalAmount: number;
  splitType: {
    equal?: number[];
    exact?: number[];
    percentage?: number[];
  };
  splits: {
    userId: UserId;
    value: number;
  }[];
  description?: string;
  expenseDate?: Date; // optional, defaults to now
  notes?: string;
}

export interface ExpenseRepository {
  createExpense(data: CreateExpenseData): Promise<Expense>;

  getExpenseById(expenseId: ExpenseId): Promise<Expense | null>;

  getExpensesByGroup(groupId: GroupId): Promise<Expense[]>;

  deleteExpense(expenseId: ExpenseId): Promise<void>;
}
