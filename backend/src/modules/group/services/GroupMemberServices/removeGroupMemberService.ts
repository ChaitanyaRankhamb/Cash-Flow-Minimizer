import { groupRepository } from "../../../../database/mongo/group/groupRepository";
import { GroupId } from "../../../../entities/group/GroupId";
import { GroupMember, GroupRole } from "../../../../entities/group/GroupMember";
import { UserId } from "../../../../entities/user/UserId";

export const removeGroupMemberService = async (
  groupId: string,
  userId: string
): Promise<void> => {
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

  if (member._role === GroupRole.ADMIN) {
    const allMembers = await groupRepository.findAllGroupMembers(groupIdVO);
    const adminCount = (allMembers ?? []).filter(
      (m) => m._role === GroupRole.ADMIN
    ).length;

    if (adminCount <= 1) {
      throw new Error("Cannot remove the last admin from the group");
    }
  }

  await groupRepository.removeGroupMember({
    groupId: groupIdVO,
    userId: userIdVO,
  });
};
