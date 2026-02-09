import { groupRepository } from "../../../../database/mongo/group/groupRepository";
import { userRepository } from "../../../../database/mongo/user/userRepository";
import { GroupId } from "../../../../entities/group/GroupId";
import { GroupMember, GroupRole } from "../../../../entities/group/GroupMember";
import { UserId } from "../../../../entities/user/UserId";

export const getGroupMemberService = async (
  groupId: string,
  userId: string,
  role?: GroupRole | string
): Promise<GroupMember | null> => {
  // does a group exist with groupId
  const group = await groupRepository.exists(new GroupId(groupId));

  if (!group) {
    throw new Error("Group not Found!");
  }

  const user = await userRepository.findUserByID(new UserId(userId));

  if (!user) {
    throw new Error("User not Found!");
  }

  // check user already is a group member or not
  const groupMember = await groupRepository.findGroupMember(
    new GroupId(groupId),
    new UserId(userId)
  );

  if (!groupMember) {
    throw new Error("Group Member is not exist!");
  }

  return groupMember;
};
