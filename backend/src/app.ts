import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import connectDB from "./lib/connection";
import { Request, Response } from "express";
import groupRoutes from "./modules/group/group.routes"
import expenseRoutes from "./modules/expense/expense.routes"
import balanceRoutes from "./modules/balance/balance.route"
import minimizationRoutes from "./modules/minimization/minimization.route"
import suggestionRoutes from "./modules/suggestion/suggestion.route"
import cookieParser from "cookie-parser";

// Connect to database before setting up routes (top-level await runs on import)
await connectDB();

const app = express();

// cross origin resources sharable
app.use(cors({ 
  origin: "http://localhost:3000",
  credentials: true
 }));

app.use(express.json());  // express middleware
app.use(cookieParser());  // cookie configuration in the app

app.get("/health", async (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

app.use("/auth", authRoutes);
app.use("/groups", groupRoutes);
app.use("/groups", expenseRoutes);
app.use("/groups", balanceRoutes);
app.use("/groups/", minimizationRoutes);
app.use("/groups", suggestionRoutes);

export default app;
