import { Request, Response } from "express";
import { GroupId } from "../../../../entities/group/GroupId";
import { deleteGroupService } from "../../services/groupService";


export const deleteGroupController = async (
  req: Request<{ groupId: string }>,
  res: Response
): Promise<void> => {
  try {
    const { groupId } = req.params;

    /* -------------------- Validation -------------------- */
    if (!groupId) {
      res.status(400).json({
        message: "Missing required parameter: groupId",
      });
      return;
    }

    /* -------------------- Service Call -------------------- */
    await deleteGroupService(new GroupId(groupId));

    res.status(200).json({
      message: "Group deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete Group Error:", error);

    const message = error.message?.toLowerCase() || "";

    if (message.includes("not found")) {
      res.status(404).json({ message: error.message });
      return;
    }

    if (
      message.includes("forbidden") ||
      message.includes("not authorized")
    ) {
      res.status(403).json({ message: error.message });
      return;
    }

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};