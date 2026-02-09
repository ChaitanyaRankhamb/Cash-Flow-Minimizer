import { groupRepository } from "../../../../database/mongo/group/groupRepository";
import { GroupId } from "../../../../entities/group/GroupId";

export const deleteGroupService = async (
  groupId: GroupId
): Promise<void> => {

  const existing = await groupRepository.findGroupById(groupId);
  if (!existing) {
    throw new Error("Group not found");
  }

  await groupRepository.deleteGroup(groupId);
};