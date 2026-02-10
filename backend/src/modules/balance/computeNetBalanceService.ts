import { Expense } from "../../entities/expense/Expense";
import { ExpenseSplit } from "../../entities/expense/ExpenseSplit";
import { Settlement } from "../../entities/settlement/settlement";

export const computeNetBalances = (
  expenses: Expense[],
  splits: ExpenseSplit[],
  settlements: Settlement[] = []
): Map<string, number> => {
  const balanceMap: Map<string, number> = new Map();

  // 1. Credit payers
  for (const expense of expenses) {
    const payerId = expense.paidBy.toString();
    const prev = balanceMap.get(payerId) ?? 0;
    balanceMap.set(payerId, prev + expense.totalAmount);
  }

  // 2. Debit split users
  for (const split of splits) {
    const userId = split.userId.toString();
    const prev = balanceMap.get(userId) ?? 0;
    balanceMap.set(userId, prev - split.amount);
  }

  // 3. Process Settlements
  for (const settlement of settlements) {
    const who = settlement.who.toString(); // Debtor (paid)
    const whom = settlement.whom.toString(); // Creditor (received)

    // Who paid, so they get +Amount (reducing their debt)
    const prevWho = balanceMap.get(who) ?? 0;
    balanceMap.set(who, prevWho + settlement.amount);

    // Whom received, so they get -Amount (reducing their credit)
    const prevWhom = balanceMap.get(whom) ?? 0;
    balanceMap.set(whom, prevWhom - settlement.amount);
  }

  return balanceMap;
};