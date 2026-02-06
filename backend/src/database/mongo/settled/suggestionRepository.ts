import { GroupId } from "../../../entities/group/GroupId";
import { Suggestion } from "../../../entities/settled/Suggestion";
import { SuggestionId } from "../../../entities/settled/SuggestionId";
import type {
  SuggestionRepository as ISuggestionRepository,
  SuggestionData,
} from "../../../entities/settled/SuggestionRepository";
import { UserId } from "../../../entities/user/UserId";
import { SuggestionDocument, SuggestionModel } from "./suggestionSchema";


function docToSuggestion(doc: SuggestionDocument): Suggestion {
  return new Suggestion(
    new SuggestionId(doc._id.toString()),
    new GroupId(doc.groupId.toString()),
    new UserId(doc.who.toString()),
    new UserId(doc.whom.toString()),
    doc.amount,
    doc.isSettled,
    doc.createdAt,
    doc.updatedAt
  );
}

export class mongoSuggestionRepository implements ISuggestionRepository {
  getSettlementById(suggestionId: SuggestionId): Promise<Suggestion | null> {
    throw new Error("Method not implemented.");
  }
  getSettlementsByGroup(groupId: GroupId): Promise<Suggestion[]> {
    throw new Error("Method not implemented.");
  }
  deleteSettlement(suggestionId: SuggestionId): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteSettlementByGroup(groupId: GroupId): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async createSuggestion(data: SuggestionData): Promise<Suggestion | null> {
    const doc = await SuggestionModel.create({
      groupId: data.groupId.toString(),
      who: data.who.toString(),
      whom: data.whom.toString(),
      amount: data.amount,
    });
    return doc ? docToSuggestion(doc) : null;
  }

  async getSuggestionById(
    suggestionId: SuggestionId
  ): Promise<Suggestion | null> {
    const doc = await SuggestionModel.findById(suggestionId.toString());
    return doc ? docToSuggestion(doc) : null;
  }

  async getSuggestionsByGroup(groupId: GroupId): Promise<Suggestion[]> {
    const docs = await SuggestionModel.find({
      groupId: groupId.toString(),
    });
    return docs.map(docToSuggestion);
  }

  async getPendingSuggestionsByUser(
    userId: UserId,
    groupId?: GroupId
  ): Promise<Suggestion[]> {
    const query: any = {
      isSettled: false,
      $or: [{ who: userId.toString() }, { whom: userId.toString() }],
    };

    if (groupId) {
      query.groupId = groupId.toString();
    }

    const docs = await SuggestionModel.find(query);
    return docs.map(docToSuggestion);
  }

  async markAsSettled(suggestionId: SuggestionId): Promise<void> {
    const doc = await SuggestionModel.findByIdAndUpdate(
      suggestionId.toString(),
      { isSettled: true },
      { new: true }
    );

    if (!doc) {
      throw new Error("Suggestion not found");
    }
  }

  async deleteSuggestionsByGroup(groupId: GroupId): Promise<void> {
    await SuggestionModel.deleteMany({
      groupId: groupId.toString(),
      isSettled: false,
    });
  }
}

export const suggestionRepository = new mongoSuggestionRepository();