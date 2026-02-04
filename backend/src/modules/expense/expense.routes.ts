import express from "express";
import {
  createExpenseController,
  getExpenseByIdController,
  getExpensesByGroupController,
  updateExpenseController,
  deleteExpenseController,
} from "./expense.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = express.Router();

// Apply authMiddleware to all expense routes
router.use(authMiddleware);

//Expense Routers

// create expense
router.post("/:groupId/expenses", createExpenseController);

// get expenses by group
router.get("/:groupId/expenses", getExpensesByGroupController);

// get single expense
router.get("/:groupId/expenses/:expenseId", getExpenseByIdController);

// update expense
router.patch("/:groupId/expenses/:expenseId", updateExpenseController);

// delete expense
router.delete("/:groupId/expenses/:expenseId", deleteExpenseController);

export default router;
