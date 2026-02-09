import { groupRepository } from "../../../../database/mongo/group/groupRepository";
import { GroupId } from "../../../../entities/group/GroupId";
import { GroupMember, GroupRole } from "../../../../entities/group/GroupMember";
import { UserId } from "../../../../entities/user/UserId";

const parseRole = (role?: GroupRole | string): GroupRole => {
  if (!role) return GroupRole.MEMBER;

  const normalized = String(role).toUpperCase();
  return normalized === GroupRole.ADMIN ? GroupRole.ADMIN : GroupRole.MEMBER;
};

export const updateGroupMemberRoleService = async (
  groupId: string,
  userId: string,
  role: GroupRole | string
): Promise<GroupMember> => {
  const groupIdVO = new GroupId(groupId);
  const userIdVO = new UserId(userId);

  const groupExists = await groupRepository.exists(groupIdVO);
  if (!groupExists) {
    throw new Error("Group not found");
  }

  const member = await groupRepository.findGroupMember(groupIdVO, userIdVO);

  if (!member) {
    throw new Error("Group member not found");
  }

  const parsedRole = parseRole(role);
  if (!parsedRole) {
    throw new Error("Invalid group role");
  }

  const updatedMember = await groupRepository.updateGroupMemberRole({
    groupId: groupIdVO,
    userId: userIdVO,
    role: parsedRole,
  });

  return updatedMember;
};
