import { Request, Response } from "express";
import { updateGroupService } from "../../services/groupService";
import { GroupId } from "../../../../entities/group/GroupId";

interface UpdateGroupBody {
  name?: string;
  description?: string;
}

export const updateGroupController = async (
  req: Request<{ groupId: string }, {}, UpdateGroupBody>,
  res: Response
): Promise<void> => {
  try {
    const { groupId } = req.params;
    const { name, description } = req.body;

    if (!groupId) {
      res.status(400).json({
        message: "Missing required parameter: groupId",
      });
      return;
    }

    if (!name && !description) {
      res.status(400).json({
        message: "Nothing to update. Provide name or description",
      });
      return;
    }

    const payload: UpdateGroupBody = {};
    if (name !== undefined) payload.name = name;
    if (description !== undefined) payload.description = description;

    const updatedGroup = await updateGroupService(
      new GroupId(groupId),
      payload
    );

    res.status(200).json({
      message: "Group updated successfully",
      group: updatedGroup,
    });
  } catch (error: any) {
    console.error("Update Group Error:", error);

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