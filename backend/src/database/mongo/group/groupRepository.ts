import type {
  CreateGroupData,
  UpdateGroupData,
  AddGroupMemberData,
  UpdateGroupMemberRoleData,
  RemoveGroupMemberData,
  GroupRepository as IGroupRepository,
} from "../../../entities/group/GroupRepository";
import { Group } from "../../../entities/group/Group";
import { GroupId } from "../../../entities/group/GroupId";
import { GroupMemberId } from "../../../entities/group/GroupMemberId";
import { GroupDocument, GroupModel } from "./groupSchema";
import { UserId } from "../../../entities/user/UserId";
import { GroupMember, GroupRole } from "../../../entities/group/GroupMember";
import { GroupMemberModel, GroupMemberDocument } from "./groupMemberSchema";
import mongoose from "mongoose";

function docToGroup(doc: GroupDocument): Group {
  return new Group(
    new GroupId(doc._id.toString()),
    doc.name,
    doc.description,
    new UserId(doc.createdBy as string),
    doc.isActive,
    doc.createdAt,
    doc.updatedAt
  );
}

function docToGroupMember(doc: GroupMemberDocument): GroupMember {
  return new GroupMember(
    new GroupMemberId(doc._id.toString()),
    new GroupId(doc.groupId.toString()),
    new UserId(doc.userId.toString()),
    doc.role,
    doc.joinedAt
  );
}

export class MongoGroupRepository implements IGroupRepository {
  async createGroup(data: CreateGroupData): Promise<Group> {
    const doc = await GroupModel.create({
      name: data.name,
      description: data.description ?? "",
      createdBy: data.createdBy.toString(),
      isActive: true,
    });
    return docToGroup(doc);
  }

  async findGroupById(groupId: GroupId): Promise<Group | null> {
    const doc = await GroupModel.findById(groupId.toString());
    return doc ? docToGroup(doc) : null;
  }

  async findGroupByName(name: string): Promise<Group | null> {
    const doc = await GroupModel.findOne({ name });
    return doc ? docToGroup(doc) : null;
  }

  async findGroupsByUser(userId: UserId): Promise<Group[]> {
    const docs = await GroupModel.find({ createdBy: userId.toString() });
    return docs.map(docToGroup);
  }

  async updateGroup(data: UpdateGroupData): Promise<Group> {
    const doc = await GroupModel.findByIdAndUpdate(
      data.groupId.toString(),
      {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
      },
      { new: true }
    );
    if (!doc) throw new Error("Group not found");
    return docToGroup(doc);
  }

  async deleteGroup(groupId: GroupId): Promise<void> {
    await GroupModel.findByIdAndDelete(groupId.toString());
  }

  async addGroupMember(data: AddGroupMemberData): Promise<GroupMember> {
    const doc = await GroupMemberModel.create({
      groupId: new mongoose.Types.ObjectId(data.groupId.toString()),
      userId: new mongoose.Types.ObjectId(data.userId.toString()),
      role: data.role,
      joinedAt: new Date(),
    });
    return docToGroupMember(doc);
  }

  async findGroupMember(
    groupId: GroupId,
    userId: UserId
  ): Promise<GroupMember | null> {
    const doc = await GroupMemberModel.findOne({
      groupId: new mongoose.Types.ObjectId(groupId.toString()),
      userId: new mongoose.Types.ObjectId(userId.toString()),
    });
    return doc ? docToGroupMember(doc) : null;
  }

  async updateGroupMemberRole(
    data: UpdateGroupMemberRoleData
  ): Promise<GroupMember> {
    const doc = await GroupMemberModel.findOneAndUpdate(
      {
        groupId: new mongoose.Types.ObjectId(data.groupId.toString()),
        userId: new mongoose.Types.ObjectId(data.userId.toString()),
      },
      { role: data.role },
      { new: true }
    );
    if (!doc) throw new Error("Group member not found");
    return docToGroupMember(doc);
  }

  async removeGroupMember(data: RemoveGroupMemberData): Promise<void> {
    await GroupMemberModel.findOneAndDelete({
      groupId: new mongoose.Types.ObjectId(data.groupId.toString()),
      userId: new mongoose.Types.ObjectId(data.userId.toString()),
    });
  }
}

export const groupRepository = new MongoGroupRepository();
