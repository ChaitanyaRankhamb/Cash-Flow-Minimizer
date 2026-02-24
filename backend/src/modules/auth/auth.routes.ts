import express from "express";
import { loginController, registerController } from "./auth.controller";
import { authRateLimiter } from "../../middleware/authRateLimiter";

const router = express.Router();

// Public routes (no token required)
router.post("/register", authRateLimiter, registerController);
router.post("/login", authRateLimiter, loginController);

// Protected routes (require Bearer token) – add your guarded routes here, e.g.:
// router.get("/me", authMiddleware, meController);
// router.post("/logout", authMiddleware, logoutController);

export default router;
