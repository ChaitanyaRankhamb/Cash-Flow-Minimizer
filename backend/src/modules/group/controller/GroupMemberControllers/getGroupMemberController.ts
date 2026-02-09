import { Request, Response } from "express";
import { getGroupMemberService } from "../../services/GroupMemberServices/getGroupMemberService";

type GroupMemberParams = {
  groupId: string;
  userId: string;
};

export const getGroupMemberController = async (
  req: Request<GroupMemberParams>,
  res: Response
): Promise<void> => {
  try {
    const { groupId, userId } = req.params;

    if (!groupId || !userId) {
      res.status(400).json({
        message: "Missing required parameters: groupId or userId",
      });
      return;
    }

    const member = await getGroupMemberService(groupId, userId);

    res.status(200).json({
      message: "Group member fetched successfully",
      member,
    });
  } catch (error: any) {
    console.error("Get Group Member Error:", error);

    const message = error.message?.toLowerCase() || "";

    if (message.includes("not found")) {
      res.status(404).json({ message: error.message });
      return;
    }

    if (message.includes("forbidden") || message.includes("not authorized")) {
      res.status(403).json({ message: error.message });
      return;
    }

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
