import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { createExpenseController } from "./controllers/createExpenseController";
import { getExpensesByGroupController } from "./controllers/getExpensesByGroupController";
import { getExpenseByIdController } from "./controllers/getExpenseByIdController";
import { updateExpenseController } from "./controllers/updateExpenseController";
import { deleteExpenseController } from "./controllers/deleteExpenseController";

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
