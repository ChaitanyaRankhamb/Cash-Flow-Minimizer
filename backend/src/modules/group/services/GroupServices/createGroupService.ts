import { groupRepository } from "../../../../database/mongo/group/groupRepository";
import { Group } from "../../../../entities/group/Group";
import { GroupRole } from "../../../../entities/group/GroupMember";
import { UserId } from "../../../../entities/user/UserId";


export const createGroupService = async (
  name: string,
  description: string | undefined,
  userId: string
): Promise<Group> => {

  const createdBy = new UserId(userId);

  const group = await groupRepository.createGroup({
    name,
    ...(description !== undefined && { description }),
    createdBy,
  });

  await groupRepository.addGroupMember({
    groupId: group.id,
    userId: createdBy,
    role: GroupRole.ADMIN,
  });

  return group;
};