import { groupRepository } from "../../../database/mongo/group/groupRepository";
import { GroupId } from "../../../entities/group/GroupId";
import { UserId } from "../../../entities/user/UserId";
import { GroupMember, GroupRole } from "../../../entities/group/GroupMember";

const parseRole = (role?: GroupRole | string): GroupRole => {
  if (!role) return GroupRole.MEMBER;

  const normalized = String(role).toUpperCase();
  return normalized === GroupRole.ADMIN ? GroupRole.ADMIN : GroupRole.MEMBER;
};

export const addGroupMemberService = async (
  groupId: string,
  userId: string,
  role?: GroupRole | string
): Promise<GroupMember> => {
  return groupRepository.addGroupMember({
    groupId: new GroupId(groupId),
    userId: new UserId(userId),
    role: parseRole(role),
  });
};

export const getGroupMemberService = async (
  groupId: string,
  userId: string
): Promise<GroupMember | null> => {
  return groupRepository.findGroupMember(
    new GroupId(groupId),
    new UserId(userId)
  );
};

export const getAllGroupMembersService = async (
  groupId: string,
) : Promise<GroupMember[] | null> => {
  return groupRepository.findAllGroupMembers(
    new GroupId(groupId),
  );
}

export const updateGroupMemberRoleService = async (
  groupId: string,
  userId: string,
  role: GroupRole | string
): Promise<GroupMember> => {
  return groupRepository.updateGroupMemberRole({
    groupId: new GroupId(groupId),
    userId: new UserId(userId),
    role: parseRole(role),
  });
};

export const removeGroupMemberService = async (
  groupId: string,
  userId: string
): Promise<void> => {
  await groupRepository.removeGroupMember({
    groupId: new GroupId(groupId),
    userId: new UserId(userId),
  });
};
