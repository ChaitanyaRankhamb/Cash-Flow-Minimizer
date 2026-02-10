import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { ConfirmSuggestionSettlementController } from "./suggestionSettlement.controller";

const router = express.Router();

router.use(authMiddleware);

router.post("/:groupId/suggestions/:suggestionId/confirm", ConfirmSuggestionSettlementController);



export default router;