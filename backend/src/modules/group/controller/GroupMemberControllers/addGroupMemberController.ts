import { Request, Response } from "express";
import { addGroupMemberService } from "../../services/GroupMemberServices/addGroupMemberService";

type GroupParams = {
  groupId: string;
};

type GroupMemberParams = {
  groupId: string;
  userId: string;
};

interface AddGroupMemberBody {
  userId: string;
  role?: string;
}

export const addGroupMemberController = async (
  req: Request<GroupParams, {}, AddGroupMemberBody>,
  res: Response
): Promise<void> => {
  try {
    const { groupId } = req.params;
    const { userId, role } = req.body;

    if (!groupId || !userId) {
      res
        .status(400)
        .json({ message: "Missing required fields: groupId, userId" });
      return;
    }

    const member = await addGroupMemberService(groupId, userId, role);

    res
      .status(201)
      .json({ message: "Group member added successfully!", member });
  } catch (error: any) {
    console.error("Add Group Member Error:", error);

    const message = error.message?.toLowerCase() || "";

    if (message.includes("not found")) {
      res.status(404).json({ message: error.message });
      return;
    }

    if (message.includes("already")) {
      res.status(409).json({ message: error.message });
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
