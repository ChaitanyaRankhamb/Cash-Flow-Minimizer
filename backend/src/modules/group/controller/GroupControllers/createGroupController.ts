import { Response } from "express";
import { AuthRequest } from "../../../../middleware/authMiddleware";
import { createGroupService } from "../../services/groupService";

interface CreateGroupBody {
  name: string;
  description?: string;
}

export const createGroupController = async (
  req: AuthRequest, 
  res: Response
): Promise<void> => {
  try {
    const { name, description } = req.body;
    const userId = req.userId;

    if (!name || !userId) {
      res.status(400).json({
        message: "Missing required fields: name",
      });
      return;
    }

    const group = await createGroupService(name, description, userId);

    res.status(201).json({
      success: true,
      message: "Group created successfully",
      data: group,
    });
  } catch (error: any) {
    console.error("Create Group Error:", error);

    const message = error.message?.toLowerCase() || "";

    if (message.includes("already")) {
      res.status(409).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};