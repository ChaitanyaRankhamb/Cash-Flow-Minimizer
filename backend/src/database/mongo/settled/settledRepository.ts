import { GroupId } from "../../../entities/group/GroupId";
import { Settled } from "../../../entities/settled/Settled";
import { SettledId } from "../../../entities/settled/SettledId";
import type { 
  SettledRepository as ISettledRepository, SettledData 
} from "../../../entities/settled/SettledRepository";
import { UserId } from "../../../entities/user/UserId";
import { SettledDocument, SettledModel } from "./settledSchema";
import mongoose from "mongoose";

function docToSettled(doc: SettledDocument): Settled {
  return new Settled(
    new SettledId(doc._id.toString()),
    new GroupId(doc.groupId.toString()),
    new UserId(doc.who.toString()),
    new UserId(doc.whom.toString()),
    doc.amount,
    doc.isSettled,
    doc.createdAt,
    doc.updatedAt,
  );
}

export class mongoSettledRepository implements ISettledRepository {
  async createSettlement(data: SettledData): Promise<Settled | null> {
    const doc = await SettledModel.create({
      groupId: data.groupId.toString(),
      who: data.who.toString(),
      whom: data.whom.toString(),
      amount: data.amount,
    });
    return doc ? docToSettled(doc) : null;
  }

  async getSettlementById(settledId: SettledId): Promise<Settled | null> {
    const doc = await SettledModel.findById(settledId.toString());
    return doc ? docToSettled(doc) : null;
  }

  async getSettlementsByGroup(groupId: GroupId): Promise<Settled[]> {
    const docs = await SettledModel.find({ groupId: groupId.toString() });
    return docs.map(docToSettled);
  }

  async getPendingSettlementsByUser(userId: UserId, groupId?: GroupId): Promise<Settled[]> {
    // Pending means isSettled === false. Filter by user involvement (as 'who' or 'whom'), optionally also by group.
    let query: any = {
      isSettled: false,
      $or: [
        { who: userId.toString() },
        { whom: userId.toString() }
      ]
    };

    if (groupId) {
      query.groupId = groupId.toString();
    }
    const docs = await SettledModel.find(query);
    return docs.map(docToSettled);
  }

  async markAsSettled(settledId: SettledId): Promise<void> {
    const doc = await SettledModel.findByIdAndUpdate(
      settledId.toString(),
      { isSettled: true },
      { new: true }
    );
    if (!doc) {
      throw new Error("Settlement not found");
    }
  }

  async deleteSettlement(settledId: SettledId): Promise<void> {
    await SettledModel.findByIdAndDelete(settledId.toString());
  }
}
