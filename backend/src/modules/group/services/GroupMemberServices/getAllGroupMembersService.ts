import { groupRepository } from "../../../../database/mongo/group/groupRepository";
import { GroupId } from "../../../../entities/group/GroupId";
import { GroupMember } from "../../../../entities/group/GroupMember";

export const getAllGroupMembersService = async (
  groupId: string
): Promise<GroupMember[]> => {
  const groupIdVO = new GroupId(groupId);

  const groupExists = await groupRepository.exists(groupIdVO);
  if (!groupExists) {
    throw new Error("Group not found");
  }

  const members = await groupRepository.findAllGroupMembers(groupIdVO);

  return members ?? [];
};
