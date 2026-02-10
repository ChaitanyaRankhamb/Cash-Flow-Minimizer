import { GroupId } from "./GroupId";
import { UserId } from "../user/UserId";
import { GroupMemberId } from "./GroupMemberId";

export enum GroupRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export class GroupMember {
  public constructor(
    public readonly _id: GroupMemberId,
    public readonly _groupId: GroupId,
    public readonly _userId: UserId,
    public _role: GroupRole,
    public readonly _joinedAt: Date
  ) {}

  static create(
    id: GroupMemberId,
    groupId: GroupId,
    userId: UserId,
    role: GroupRole,
    joinedAt: Date = new Date()
  ): GroupMember {
    return new GroupMember(id, groupId, userId, role, joinedAt);
  }

  promoteToAdmin(): void {
    this._role = GroupRole.ADMIN;
  }

  demoteToMember(): void {
    this._role = GroupRole.MEMBER;
  }

  isAdmin(): boolean {
    return this._role === GroupRole.ADMIN;
  }
}
