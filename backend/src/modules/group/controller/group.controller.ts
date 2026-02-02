import { Request, Response } from "express";
import {
  createGroupService,
  getGroupService,
  updateGroupService,
  deleteGroupService,
} from "../services/groupService";
import { GroupId } from "../../../entities/group/GroupId";
import { UserId } from "../../../entities/user/UserId";
import { groupRepository } from "../../../database/mongo/group/groupRepository";

interface CreateGroupBody {
  name: string;
  description?: string;
  userId: string;
}

interface GetGroupBody {
  groupId?: GroupId;
  name?: string;
  userId?: UserId;
}

interface UpdateGroupBody {
  name?: string;
  description?: string;
}

export const createGroupController = async (
  req: Request<{}, {}, CreateGroupBody>,
  res: Response
) => {
  try {
    const { name, description, userId } = req.body;
    if (!name || !userId) {
      return res
        .status(400)
        .json({ message: "Missing required fields: name, userId" });
    }

    const group = await createGroupService(name, description, userId);
    if (!group) {
      return res
        .status(400)
        .json({ message: "Unable to create group. Please try again." });
    }

    return res
      .status(201)
      .json({ message: "Group created successfully!", group });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getGroupController = async (
  req: Request<{}, {}, GetGroupBody>,
  res: Response
) => {
  try {
    const { groupId, name, userId } = req.body;

    if (!groupId && !name && !userId) {
      return res
        .status(400)
        .json({ message: "Missing identifiers: groupId, name, or userId." });
    }

    const groups = await getGroupService(groupId, name, userId);

    if (!groups || (Array.isArray(groups) && groups.length === 0)) {
      return res.status(404).json({ message: "Groups not found!" });
    }

    if (Array.isArray(groups)) {
      return res
        .status(200)
        .json({ message: "Groups retrieved successfully!", groups });
    } else {
      return res
        .status(200)
        .json({ message: "Group retrieved successfully!", group: groups });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateGroupController = async (
  req: Request<{ groupId: string }, {}, UpdateGroupBody>,
  res: Response
) => {
  try {
    const { groupId } = req.params;
    const newgroupId = new GroupId(groupId);

    const { name, description } = req.body;

    // Validate required field
    if (!groupId) {
      return res
        .status(400)
        .json({ message: "Missing groupId in URL!" });
    }

    // Ensure at least one field to update
    if (!name && !description) {
      return res
        .status(400)
        .json({ message: "Nothing to update. Provide name or description." });
    }

    const payload: { name?: string; description?: string } = {};
    if (name !== undefined) payload.name = name;
    if (description !== undefined) payload.description = description;

    // Call service
    const updatedGroup = await updateGroupService(newgroupId, payload);

    if (!updatedGroup) {
      return res
        .status(404)
        .json({ message: "Group not found or update failed." });
    }

    return res
      .status(200)
      .json({ message: "Group updated successfully!", group: updatedGroup });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const deleteGroupController = async (
  req: Request<{ groupId: string }, {}, {}>,
  res: Response
) => {
  try {
    const { groupId } = req.params;
    const newGroupId = new GroupId(groupId);

    // Validate required field
    if (!groupId) {
      return res.status(400).json({
        message: "Missing required field: groupId",
      });
    }

    // Call service
    const isDeleted = await deleteGroupService(newGroupId);

    if (!isDeleted) {
      return res.status(404).json({
        message: "Group not found or delete failed.",
      });
    }

    return res.status(200).json({
      message: "Group deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
