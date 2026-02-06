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
    const settlements = await groupMinimizationService(
      new GroupId(groupId.toString()),
      new UserId(userId)
    );

    res.status(200).json({
      message: "Settlement suggestions generated successfully",
      data: settlements,
    });

  } catch (error) {
    // Single fallback for all unexpected errors
    console.error("groupMinimizationController error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};