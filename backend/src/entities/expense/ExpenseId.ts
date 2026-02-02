export class ExpenseId {
  constructor(private readonly value: string) {}

  toString(): string {
    return this.value;
  }
}