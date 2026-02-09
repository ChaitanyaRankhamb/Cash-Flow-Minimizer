import { Request, Response } from "express";
import { getGroupService } from "../../services/groupService";
import { UserId } from "../../../../entities/user/UserId";
import { GroupId } from "../../../../entities/group/GroupId";

interface GetGroupQuery {
  groupId?: string;
  name?: string;
  userId?: string;
}

export const getGroupController = async (
  req: Request<{}, {}, {}, GetGroupQuery>,
  res: Response
): Promise<void> => {
  try {
    const { groupId, name, userId } = req.query;

    if (
      (groupId === undefined || groupId === "") &&
      (name === undefined || name === "") &&
      (userId === undefined || userId === "")
    ) {
      res.status(400).json({
        message: "Provide at least one identifier: groupId, name, or userId",
      });
      return;
    }

    const groupIdObj = groupId ? new GroupId(groupId) : undefined;
    const userIdObj = userId ? new UserId(userId) : undefined;

    const groups = await getGroupService(
      groupIdObj,
      name,
      userIdObj
    );


    if (!groups || (Array.isArray(groups) && groups.length === 0)) {
      res.status(404).json({
        message: "Group(s) not found",
      });
      return;
    }

    res.status(200).json({
      message: "Group(s) fetched successfully",
      data: groups,
    });
  } catch (error: any) {
    console.error("Get Group Error:", error);

    const message = error.message?.toLowerCase() || "";

    if (message.includes("not found")) {
      res.status(404).json({ message: error.message });
      return;
    }

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};