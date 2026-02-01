import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import connectDB from "./lib/connection";
import { Request, Response } from "express";

// Connect to database before setting up routes (top-level await runs on import)
await connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

app.use("/auth", authRoutes);

export default app;
