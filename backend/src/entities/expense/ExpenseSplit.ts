import { UserId } from "../user/UserId";
import { ExpenseSplitId } from "./ExpenseSplitId";
import { ExpenseId } from "./ExpenseId";

export class ExpenseSplit {
  constructor(
    public readonly _id: ExpenseSplitId,
    public readonly expenseId: ExpenseId,
    public userId: UserId,
    public amount: number,
    public percentage?: number,
    public isSettled: boolean = false,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
    if (amount < 0) throw new Error("Amount cannot be negative");
    if (percentage !== undefined && (percentage < 0 || percentage > 100)) {
      throw new Error("Percentage must be between 0 and 100");
    }
  }
}
