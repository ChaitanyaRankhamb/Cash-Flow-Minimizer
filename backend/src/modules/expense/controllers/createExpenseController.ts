import { CreateExpenseData } from "../../../entities/expense/ExpenseRepository";
import { AuthRequest } from "../../../middleware/authMiddleware";
import { Response } from "express";
import { createExpenseService } from "../services/createExpenseService";

export const createExpenseController = async (
  req: AuthRequest & {
    params: { groupId: string };
    body: Omit<CreateExpenseData, "groupId" | "paidBy">;
  },
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const result = await createExpenseService({
      groupId: req.params.groupId,
      paidBy: req.userId,
      payload: req.body,
    });

    res.status(201).json({
      message: "Expense created successfully",
      expense: result,
    });
  } catch (error: any) {
    console.error("Create Expense Error:", error);

    switch (error.name) {
      case "GroupNotFoundError":
        res.status(404).json({ message: error.message });
        break;

      case "ForbiddenError":
        res.status(403).json({ message: error.message });
        break;

      case "ValidationError":
        res.status(400).json({ message: error.message, details: error.details });
        break;

      default:
        res.status(500).json({
          message: "Internal Server Error",
        });
    }
  }
};