import { groupRepository } from "../../database/mongo/group/groupRepository";
import { suggestionRepository } from "../../database/mongo/settled/suggestionRepository";
import { GroupId } from "../../entities/group/GroupId";
import { Suggestion } from "../../entities/settled/Suggestion";
import { UserId } from "../../entities/user/UserId";
import { groupBalanceService } from "../balance/balance.service";

export const groupMinimizationService = async (
  groupId: GroupId,
  requesterId: UserId
): Promise<Suggestion[]> => {
  // check group validation
  const group = await groupRepository.exists(groupId);
  if (!group) {
    throw Object.assign(new Error("Group Not Found!")), {
      name: "GroupNotFoundError",
    }
  }

  const isMember = await groupRepository.findGroupMember(groupId, requesterId);
  if (!isMember) {
    throw Object.assign(new Error("User is Not a member of group!")), {
      name: "UserNotGroupMemberError",
    }
  }
  // delete previous settled suggesion who still pending to settled
  await suggestionRepository.deleteSuggestionsByGroup(groupId);

  // get balances of the group
  const balances = await groupBalanceService({ groupId, requesterId });
  if (!balances) {
    throw Object.assign(new Error("Error in balance fetching!")), {
      name: "BalanceFetchingError",
    } 
  }

  const creditors = balances
    .filter((b) => b.netBalance > 0)
    .sort((a, b) => b.netBalance - a.netBalance);

  const debtors = balances
    .filter((b) => b.netBalance < 0)
    .sort((a, b) => a.netBalance - b.netBalance);

  const createdSuggestions: Suggestion[] = [];

  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    if (!debtor || !creditor) {
      throw new Error("Invalid debtor or creditor during minimization");
    }

    if (debtor.netBalance === undefined || creditor.netBalance === undefined) {
      throw new Error("Net balance is missing during minimization");
    }

    const debit = Math.min(Math.abs(debtor.netBalance), creditor.netBalance);

    const suggestion = await suggestionRepository.createSuggestion({
      groupId,
      who: debtor.userId,
      whom: creditor.userId,
      amount: Number(debit.toFixed(2)),
    });

    if (suggestion !== null) {
      createdSuggestions.push(suggestion);
    }

    debtor.netBalance += debit;
    creditor.netBalance -= debit;

    if (debtor.netBalance === 0) i++;
    if (creditor.netBalance === 0) j++;
  }

  return createdSuggestions;
};
