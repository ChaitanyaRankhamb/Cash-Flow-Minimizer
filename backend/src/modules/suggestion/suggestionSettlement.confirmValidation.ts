import { groupRepository } from "../../database/mongo/group/groupRepository";
import { GroupId } from "../../entities/group/GroupId";
import { UserId } from "../../entities/user/UserId";

export const isConfirmValidation = async (
  confirmedBy: string,
  who: string,
  whom: string,
  groupId: string
): Promise<boolean> => {
  // check who
  if (confirmedBy === who) return true;

  /// check whom
  if (confirmedBy === whom) return true;

  const isMember = await groupRepository.findGroupMember(
    new GroupId(groupId),
    new UserId(confirmedBy)
  );

  // check group admin
  if (isMember) return true;

  return false;
};
