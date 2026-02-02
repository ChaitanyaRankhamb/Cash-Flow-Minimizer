import { Request, Response } from "express";
import {
  addGroupMemberService,
  getGroupMemberService,
  getAllGroupMembersService,
  updateGroupMemberRoleService,
  removeGroupMemberService,
} from "../services/groupMemberService";

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

interface UpdateGroupMemberRoleBody {
  role: string;
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getGroupMemberController = async (
  req: Request<GroupMemberParams>,
  res: Response
): Promise<void> => {
  try {
    const { groupId, userId } = req.params;

    if (!groupId || !userId) {
      res
        .status(400)
        .json({ message: "Missing required fields: groupId, userId" });
      return;
    }

    const member = await getGroupMemberService(groupId, userId);

    if (!member) {
      res.status(404).json({ message: "Group member not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Group member retrieved successfully!", member });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getAllGroupMembersController = async (
  req: Request<GroupParams>,
  res: Response
): Promise<void> => {
  try {
    const { groupId } = req.params;

    if (!groupId) {
      res.status(400).json({ message: "Missing required field: groupId" });
      return;
    }

    const members = await getAllGroupMembersService(groupId);

    res.status(200).json({
      message: "Group members retrieved successfully!",
      members,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateGroupMemberRoleController = async (
  req: Request<GroupMemberParams, {}, UpdateGroupMemberRoleBody>,
  res: Response
): Promise<void> => {
  try {
    const { groupId, userId } = req.params;
    const { role } = req.body;

    if (!groupId || !userId || !role) {
      res
        .status(400)
        .json({ message: "Missing required fields: groupId, userId, role" });
      return;
    }

    const updatedMember = await updateGroupMemberRoleService(
      groupId,
      userId,
      role
    );

    res.status(200).json({
      message: "Group member role updated successfully!",
      member: updatedMember,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const removeGroupMemberController = async (
  req: Request<GroupMemberParams>,
  res: Response
): Promise<void> => {
  try {
    const { groupId, userId } = req.params;

    if (!groupId || !userId) {
      res
        .status(400)
        .json({ message: "Missing required fields: groupId, userId" });
      return;
    }

    await removeGroupMemberService(groupId, userId);

    res.status(200).json({ message: "Group member removed successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
