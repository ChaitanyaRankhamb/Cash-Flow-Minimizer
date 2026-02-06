import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { groupMinimizationController } from "./minimization.controller";

const router = express.Router();

router.use(authMiddleware);

router.get("/:groupId/balance/minimize", groupMinimizationController);

export default router;