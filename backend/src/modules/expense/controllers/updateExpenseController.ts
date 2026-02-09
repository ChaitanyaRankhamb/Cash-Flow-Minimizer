import { AuthRequest } from "../../../middleware/authMiddleware";
import { Response } from "express";
import { updateExpenseService } from "../services/updateExpenseService";

export const updateExpenseController = async (
  req: AuthRequest & { params: { groupId: string; expenseId: string } },
  res: Response
): Promise<void> => {
  try {
    /* -------------------- Auth Check -------------------- */
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const updatedExpense = await updateExpenseService({
      groupId: req.params.groupId,
      expenseId: req.params.expenseId,
      requesterId: req.userId,
      payload: req.body,
    });

    res.status(200).json({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error: any) {
    console.error("Update Expense Error:", error);

    switch (error.name) {
      case "ExpenseNotFoundError":
        res.status(404).json({ message: error.message });
        break;

      case "ForbiddenError":
        res.status(403).json({ message: error.message });
        break;

      case "ValidationError":
        res.status(400).json({ message: error.message, details: error.details });
        break;

      default:
        res.status(500).json({ message: "Internal Server Error" });
    }
  }
};