import express from "express";
import {
  createExpenseController,
  getExpenseByIdController,
  getExpensesByGroupController,
  updateExpenseController,
  deleteExpenseController,
} from "./controller/expense.controller";
import {
  getExpenseSplitsController,
  updateExpenseSplitsController,
} from "./controller/expenseSplit.controller";

const router = express.Router();

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

// ExpenseSplits Routers

// get expense splits
router.get("/:groupId/expenses/:expenseId/splits", getExpenseSplitsController);

// update expense splits
router.patch(
  "/:groupId/expenses/:expenseId/splits",
  updateExpenseSplitsController,
);

export default router;
