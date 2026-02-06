import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { groupBalanceController } from "./balance.controller";

const router = express.Router();

// use middleware
router.use(authMiddleware);

// get the balance report
router.get("/:groupId/balance", groupBalanceController);

export default router;