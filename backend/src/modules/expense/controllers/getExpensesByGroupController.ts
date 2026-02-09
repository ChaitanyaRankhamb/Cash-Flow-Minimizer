import { AuthRequest } from "../../../middleware/authMiddleware";
import { Response } from "express";
import { getExpensesByGroupService } from "../services/getExpensesByGroupService";


export const getExpensesByGroupController = async (
  req: AuthRequest & { params: { groupId: string } },
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const expenses = await getExpensesByGroupService({
      groupId: req.params.groupId,
      requesterId: req.userId,
    });

    res.status(200).json({
      message: "Expenses retrieved successfully",
      expenses, // empty array is valid
    });
  } catch (error: any) {
    console.error("Get Expenses Error:", error);

    switch (error.name) {
      case "GroupNotFoundError":
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