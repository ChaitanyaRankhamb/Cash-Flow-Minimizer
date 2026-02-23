import { Response } from "express";
import { AuthRequest } from "../../middleware/authMiddleware";
import { GroupId } from "../../entities/group/GroupId";
import { UserId } from "../../entities/user/UserId";
import { groupMinimizationService } from "./minimization.service";

export const groupMinimizationController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  const { groupId } = req.params;
  const userId = req.userId;

  // HTTP-level validation only
  if (!groupId) {
    res.status(400).json({ message: "groupId is required" });
    return;
  }

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const suggestions = await groupMinimizationService(
      new GroupId(groupId.toString()),
      new UserId(userId)
    );

    res.status(200).json({
      success: true,
      message: "suggestions generated successfully",
      data: suggestions,
    });

  } catch (error: any) {
    // Single fallback for all unexpected errors
    switch (error.name) {
      case "GroupNotFoundError":
        res.status(404).json({ message: error.message });
        return;

      case "UserNotGroupMemberError":
        res.status(403).json({ message: error.message });
        return;

      case "BalanceFetchingError":
        res.status(400).json({ message: error.message });
        return;  

      default:
        // 5. Unexpected errors
        console.error("groupBalanceController error:", error);
        res.status(500).json({
          message: "Internal server error",
        });
        return;
    }
  }
};