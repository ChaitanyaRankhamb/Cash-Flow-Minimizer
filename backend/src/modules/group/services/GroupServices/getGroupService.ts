import { groupRepository } from "../../../../database/mongo/group/groupRepository";
import { Group } from "../../../../entities/group/Group";
import { GroupId } from "../../../../entities/group/GroupId";
import { UserId } from "../../../../entities/user/UserId";

export const getGroupService = async (
  groupId?: string,
  name?: string,
  userId?: string
): Promise<Group | Group[]> => {

  if (groupId) {
    const group = await groupRepository.findGroupById(
      new GroupId(groupId)
    );

    if (!group) {
      throw new Error("Group not found");
    }

    return group;
  }

  if (name) {
    const group = await groupRepository.findGroupByName(name);

    if (!group) {
      throw new Error("Group not found");
    }

    return group;
  }

  if (userId) {
    const groups = await groupRepository.findGroupsByUser(
      new UserId(userId)
    );

    if (!groups) {
      throw new Error("Group not found");
    }

    return groups;
  }

  throw new Error("Invalid group query");
};