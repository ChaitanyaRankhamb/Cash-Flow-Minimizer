import { SplitTypeData } from './../../../entities/expense/Expense';
import { GroupId } from "../../../entities/group/GroupId";
import { UserId } from "../../../entities/user/UserId";

export class CreateExpenseSplitInput {
  constructor(
    public userId: UserId,
    public value: number // exact amount or percentage depending on splitType
  ) {
    if (value <= 0) {
      throw new Error("Split value must be positive");
    }
  }
}

export class CreateExpenseInput {
  constructor(
    public groupId: GroupId,
    public paidBy: UserId,
    public totalAmount: number,
    public splitType: SplitTypeData,
    public splits: CreateExpenseSplitInput[],
    public description?: string
  ) {
    if (totalAmount < 0) {
      throw new Error("Expense amount must be positive!");
    }

    if (!splits || splits.length === 0) {
      throw new Error("There must be atleast one split!");
    }
  }

  // Optional validation helper
  validateSplits() {
    if (this.splitType.exact) {
      const sum = this.splits.reduce((acc, s) => acc + s.value, 0);
      if (sum !== this.totalAmount) {
        throw new Error("Exact splits must sum to totalAmount");
      }
    }
    if (this.splitType.percentage) {
      const sum = this.splits.reduce((acc, s) => acc + s.value, 0);
      if (sum !== 100) {
        throw new Error("Percentage splits must sum to 100");
      }
    }
    if (this.splitType.equal) {
      if (this.splits && this.splits.length > 0) {
        const firstValue = this.splits[0]?.value;
        const allEqual = this.splits.every(s => s.value === firstValue);
        if (!allEqual) {
          throw new Error("All splits must have the same value for equal split type");
        }
      }
    }1
  }
}
