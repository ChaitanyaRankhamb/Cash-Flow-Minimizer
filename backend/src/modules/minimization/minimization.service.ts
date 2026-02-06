import { settledRepository } from "../../database/mongo/settled/settledRepository";
import { GroupId } from "../../entities/group/GroupId";
import { Settled } from "../../entities/settled/Settled";
import { UserId } from "../../entities/user/UserId";
import { groupBalanceService } from "../balance/balance.service";

export const groupMinimizationService = async (
  groupId: GroupId,
  requesterId: UserId
): Promise<Settled[]> => {
  // delete previous settled suggesion who still pending to settled
  await settledRepository.deleteSettlementByGroup(groupId);

  const balances = await groupBalanceService({ groupId, requesterId });

  const creditors = balances
    .filter(b => b.netBalance > 0)
    .sort((a, b) => b.netBalance - a.netBalance);

  const debtors = balances
    .filter(b => b.netBalance < 0)
    .sort((a, b) => a.netBalance - b.netBalance);

  const createdSettlements: Settled[] = [];

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

    const debit = Math.min(
      Math.abs(debtor.netBalance),
      creditor.netBalance
    );

    const settlement = await settledRepository.createSettlement({
      groupId,
      who: debtor.userId,
      whom: creditor.userId,
      amount: Number(debit.toFixed(2)),
    });

    if (settlement !== null) {
      (createdSettlements).push(settlement);
    }

    debtor.netBalance += debit;
    creditor.netBalance -= debit;

    if (debtor.netBalance === 0) i++;
    if (creditor.netBalance === 0) j++;
  }

  return createdSettlements;
};