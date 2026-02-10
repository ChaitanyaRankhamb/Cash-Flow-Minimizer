import { SettlementId } from './../../../entities/settlement/settlementId';
import { CreateSettlementData, SettlementRepository } from './../../../entities/settlement/settlementRepository';
import { ExpenseId } from "../../../entities/expense/ExpenseId";
import { GroupId } from "../../../entities/group/GroupId";
import { SuggestionId } from "../../../entities/settled/SuggestionId";
import { Settlement } from "../../../entities/settlement/settlement";
import { SettlementDocument, SettlementModel } from "./settlementSchema";
import { UserId } from '../../../entities/user/UserId';

export type {
  SettlementRepository as ISettlementRepository
} from "../../../entities/settlement/settlementRepository"


function docToSettlement(doc: SettlementDocument): Settlement {
  return new Settlement(
    new SettlementId(doc._id.toString()),
    new GroupId(doc.groupId.toString()),
    doc.suggestionId.toString(),
    doc.who.toString(),
    doc.whom.toString(),
    doc.amount,
    doc.confirmedBy.toString()
  );
} 

export class mongoSettlementRepository implements SettlementRepository {
  async createSettlement(data: CreateSettlementData): Promise<Settlement> {
    const settlement : any = {
      groupId: data.groupId,
      suggestionId: data.suggestionId,
      who: data.who,
      whom: data.whom,
      amount: data.amount,
      confirmedBy: data.confirmedBy,
    }
    const doc = await SettlementModel.create(settlement);
    return docToSettlement(doc);
  }

  
  async findSettlementById(settlementId: SettlementId): Promise<Settlement | null> {
    const doc = await SettlementModel.findById(settlementId.toString());
    return doc ? docToSettlement(doc) : null;
  }
  
  async findSettlementsByGroup(groupId: GroupId): Promise<Settlement[]> {
    const docs = await SettlementModel.find({ groupId: groupId.toString() });
    return docs.map(docToSettlement);
  }

  async findSettlementsByUser(userId: UserId, groupId?: GroupId | undefined): Promise<Settlement[]> {
    const query: any = {
      $or: [
        { who: userId.toString() },
        { whom: userId.toString() }
      ]
    };

    if (groupId) {
      query.groupId = groupId.toString();
    }

    const docs = await SettlementModel.find(query);
    return docs.map(docToSettlement);
  }

  async deleteSettlementsByGroup(groupId: GroupId): Promise<void> {
    await SettlementModel.deleteMany({ groupId: groupId.toString() });
  }

}

export const settlementRepository = new mongoSettlementRepository();