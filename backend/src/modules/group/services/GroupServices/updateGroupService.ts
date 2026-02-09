import { groupRepository } from "../../../../database/mongo/group/groupRepository";
import { Group } from "../../../../entities/group/Group";
import { GroupId } from "../../../../entities/group/GroupId";

export const updateGroupService = async (
  groupId: GroupId,
  data: { name?: string; description?: string }
): Promise<Group> => {

  const existing = await groupRepository.findGroupById(groupId);
  if (!existing) {
    throw new Error("Group not found");
  }
  
  const updatedGroup = await groupRepository.updateGroup({
    groupId,
    ...(data.name !== undefined && { name: data.name }),
    ...(data.description !== undefined && {
      description: data.description,
    }),
  });

  return updatedGroup;
};