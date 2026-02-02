import express from "express";
import {
  createGroupController,
  getGroupController,
  updateGroupController,
  deleteGroupController,
} from "./controller/group.controller";
import {
  addGroupMemberController,
  getGroupMemberController,
  updateGroupMemberRoleController,
  removeGroupMemberController,
  getAllGroupMembersController,
} from "./controller/groupMember.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = express.Router();

// Apply authMiddleware to all group routes
router.use(authMiddleware);

// create group
router.post("/", createGroupController);

// get groups
router.get("/", getGroupController);

// add group member
router.post("/:groupId/members", addGroupMemberController);

// get a specific group member
router.get("/:groupId/members/:userId", getGroupMemberController);

// get all members of a group
router.get("/:groupId", getAllGroupMembersController);

// update group
router.patch("/:groupId", updateGroupController);

// delete group
router.delete("/:groupId", deleteGroupController);

// update group member role
router.patch("/:groupId/members/:userId", updateGroupMemberRoleController);

// delete group member
router.delete("/:groupId/members/:userId", removeGroupMemberController);

export default router;
