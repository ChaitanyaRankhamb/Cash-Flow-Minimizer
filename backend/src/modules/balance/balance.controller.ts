import { Response } from "express";
import { AuthRequest } from "../../middleware/authMiddleware";
import { groupBalanceService } from "./balance.service";
import { GroupId } from "../../entities/group/GroupId";
import { UserId } from "../../entities/user/UserId";

export const groupBalanceController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  // 1. Validate request inputs (HTTP-level concerns only)
  const { groupId } = req.params;
  const userId = req.userId;

  if (!groupId) {
    res.status(400).json({
      message: "groupId is required in route parameters",
    });
    return;
  }

  if (!userId) {
    res.status(401).json({
      message: "Unauthorized: user not authenticated",
    });
    return;
  }
  try {
    const balances = await groupBalanceService({
      groupId: new GroupId(groupId.toString()),
      requesterId: new UserId(userId.toString()),
    });

    res.status(200).json({
      message: "Group balances fetched successfully",
      data: balances,
    });
  } catch (error: any) {
    // 4. Map known application errors → HTTP responses
    switch (error.name) {
      case "GroupNotFoundError":
        res.status(404).json({ message: error.message });
        return;

      case "UserNotGroupMemberError":
        res.status(403).json({ message: error.message });
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