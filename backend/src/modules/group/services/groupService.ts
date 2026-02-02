import { groupRepository } from "../../../database/mongo/group/groupRepository";
import { GroupId } from "../../../entities/group/GroupId";
import { UserId } from "../../../entities/user/UserId";
import { Group } from "../../../entities/group/Group";

export const createGroupService = async (
  name: string,
  description: string | undefined,
  userId: string
): Promise<Group> => {
  const createdBy = new UserId(userId);

  return groupRepository.createGroup({
    name,
    ...(description !== undefined && { description }),
    createdBy,
  });
};

export const getGroupService = async (
  groupId?: GroupId,
  name?: string,
  userId?: UserId
): Promise<Group | Group[] | null> => {
  if (groupId) {
    return groupRepository.findGroupById(groupId);
  }

  if (name) {
    return groupRepository.findGroupByName(name);
  }

  if (userId) {
    return groupRepository.findGroupsByUser(userId);
  }

  return null;
};

export const updateGroupService = async (
  groupId: GroupId,
  data: { name?: string; description?: string }
): Promise<Group | null> => {
  try {
    return await groupRepository.updateGroup({
      groupId,
      ...(data.name !== undefined && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
    });
  } catch {
    // repository throws if not found
    return null;
  }
};

export const deleteGroupService = async (
  groupId: GroupId
): Promise<boolean> => {
  const existing = await groupRepository.findGroupById(groupId);
  if (!existing) {
    return false;
  }

  await groupRepository.deleteGroup(groupId);
  return true;
};
