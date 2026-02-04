import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No authorization header" });
  }

  console.log("Auth header:", authHeader);

  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({
        message:
          "Unauthorized - Invalid authorization format. Expected 'Bearer <token>'",
      });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided after Bearer" });
  }

  try {
    const payload = verifyToken(token as string);

    if (typeof payload === "string" || !payload.userId) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.userId = payload.userId;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
