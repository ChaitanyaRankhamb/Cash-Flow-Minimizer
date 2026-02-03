import { Request, Response } from "express";
import { GroupId } from "../../../entities/group/GroupId";
import { ExpenseId } from "../../../entities/expense/ExpenseId";
import { ExpenseSplit } from "../../../entities/expense/ExpenseSplit";
import { getExpenseSplitsService } from "../../../services/expense/getExpenseSplitsService";

export const getExpenseSplitsController = async (
  req: Request<{ groupId: string; expenseId: string }>,
  res: Response
): Promise<void> => {
  try {
    const groupId = new GroupId(req.params.groupId);
    const expenseId = new ExpenseId(req.params.expenseId);

    const splits: ExpenseSplit[] | null =
      await getExpenseSplitsService(groupId, expenseId);

    if (!splits) {
      res.status(404).json({
        message: "Expense not found",
      });
      return;
    }

    res.status(200).json({
      message: "Expense splits retrieved successfully",
      splits,
    });
  } catch (error) {
    console.error("Error fetching expense splits:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateExpenseSplitsController = async (
  req: Request<{ groupId: string; expenseId: string }>,
  res: Response
): Promise<void> => {
  try {
    const groupId = new GroupId(req.params.groupId);
    const expenseId = new ExpenseId(req.params.expenseId);

    if (!req.user?.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const currentUserId = new UserId(req.user.userId);
    const splitsInput = req.body?.splits;

    if (!splitsInput || splitsInput.length === 0) {
      res.status(400).json({
        message: "Splits data is required",
      });
      return;
    }

    const updatedSplits: ExpenseSplit[] | null =
      await updateExpenseSplitsService({
        groupId,
        expenseId,
        updatedBy: currentUserId,
        splits: splitsInput,
      });

    if (!updatedSplits) {
      res.status(404).json({
        message: "Expense not found",
      });
      return;
    }

    res.status(200).json({
      message: "Expense splits updated successfully",
      splits: updatedSplits,
    });
  } catch (error) {
    console.error("Error updating expense splits:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};