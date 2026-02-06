import { GroupId } from "../group/GroupId";
import { Settlement } from "./settlement";
import { SettlementId } from "./settlementId";
import { UserId } from "../user/UserId";
import { ExpenseId } from "../expense/ExpenseId";

export interface CreateSettlementData {
  groupId: GroupId;
  expenseId?: ExpenseId;          // optional linkage (can be dummy/null if not used yet)
  suggestionId: string;
  who: UserId;                   // debtor
  whom: UserId;                  // creditor
  amount: number;
  confirmedBy: UserId;
}

export interface SettlementRepository {
  
  createSettlement(
    data: CreateSettlementData
  ): Promise<Settlement>;

  findSettlementById(
    settlementId: SettlementId
  ): Promise<Settlement | null>;

  findSettlementsByGroup(
    groupId: GroupId
  ): Promise<Settlement[]>;

  findSettlementsByUser(
    userId: UserId,
    groupId?: GroupId
  ): Promise<Settlement[]>;

  deleteSettlementsByGroup(
    groupId: GroupId
  ): Promise<void>;
}