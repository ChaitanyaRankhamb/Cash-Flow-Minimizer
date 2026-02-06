import { ExpenseId } from "../expense/ExpenseId";
import { GroupId } from "../group/GroupId";
import { SettlementId } from "./settlementId";


export class Settlement {
  constructor(
    public id: SettlementId,
    public groupId: GroupId,
    public expenseId: ExpenseId,
    public suggestionId: string,
    public who: string,
    public whom: string,
    public amount: number,
    public confirmedBy: string,
    public timestamp: Date
  ) {}
}