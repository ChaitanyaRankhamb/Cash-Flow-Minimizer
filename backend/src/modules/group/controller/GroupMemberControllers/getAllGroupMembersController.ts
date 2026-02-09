import { Request, Response } from "express";
import { getAllGroupMembersService } from "../../services/GroupMemberServices/getAllGroupMembersService";

type GroupParams = {
  groupId: string;
};

export const getAllGroupMembersController = async (
  req: Request<GroupParams>,
  res: Response
): Promise<void> => {
  try {
    const { groupId } = req.params;

    if (!groupId) {
      res.status(400).json({
        message: "Missing required parameter: groupId",
      });
      return;
    }

    const members = await getAllGroupMembersService(groupId);

    res.status(200).json({
      message: "Group members fetched successfully",
      members,
    });
  } catch (error: any) {
    console.error("Get All Group Members Error:", error);

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
