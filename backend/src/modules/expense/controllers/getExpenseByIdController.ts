import { AuthRequest } from "../../../middleware/authMiddleware";
import { Response } from "express";
import { getExpenseByIdService } from "../services/getExpenseByIdService";

export const getExpenseByIdController = async (
  req: AuthRequest & { params: { expenseId: string } },
  res: Response
): Promise<void> => {
  try {
    /* -------------------- Auth Check -------------------- */
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const expense = await getExpenseByIdService({
      expenseId: req.params.expenseId,
      requesterId: req.userId,
    });

    res.status(200).json({
      message: "Expense retrieved successfully",
      expense,
    });
  } catch (error: any) {
    console.error("Get Expense By Id Error:", error);

    /* -------- Domain → HTTP mapping -------- */
    switch (error.name) {
      case "ExpenseNotFoundError":
        res.status(404).json({ message: error.message });
        break;

      case "ForbiddenError":
        res.status(403).json({ message: error.message });
        break;

      default:
        res.status(500).json({
          message: "Internal Server Error",
        });
    }
  }
};