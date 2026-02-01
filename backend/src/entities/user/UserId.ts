export class UserId {
  constructor(private readonly value: string) {}

  toString(): string {
    return this.value;
  }
}