import { AuthRequest } from "../../../middleware/authMiddleware";
import { Response } from "express";
import { deleteExpenseService } from "../services/deleteExpenseService";

export const deleteExpenseController = async (
  req: AuthRequest & { params: { groupId: string; expenseId: string } },
  res: Response
): Promise<void> => {
  try {
    /* -------------------- Auth Check -------------------- */
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await deleteExpenseService({
      groupId: req.params.groupId,
      expenseId: req.params.expenseId,
      requesterId: req.userId,
    });

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete Expense Error:", error);

    switch (error.name) {
      case "ExpenseNotFoundError":
        res.status(404).json({ message: error.message });
        break;

      case "ForbiddenError":
        res.status(403).json({ message: error.message });
        break;

      default:
        res.status(500).json({ message: "Internal Server Error" });
    }
  }
};