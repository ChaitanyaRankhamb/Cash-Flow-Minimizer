import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { getMeController } from "./me.controller";

const router = express.Router();

router.use(authMiddleware);

router.get("/me", getMeController);

export default router;
