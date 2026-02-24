import { AuthRequest } from "../../middleware/authMiddleware";
import { Response } from "express";
import { getMeService } from "./me.service";
import { UserId } from "../../entities/user/UserId";


export const getMeController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
    const userId = req?.userId;

    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    try {
      const user = await getMeService(new UserId(userId));
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  };