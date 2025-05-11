import { Router } from "express";
import { createExpense, createExpenseByCategory, createPurchase, createSale, getExpenseByCategory, getExpenses, getPurchases, getSales } from "../controllers/finances.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

//Purchases
router.get('/purchases', authenticate, getPurchases);
router.post('/purchases', authenticate, createPurchase);
//Sales
router.get('/sales', authenticate, getSales);
router.post('/sales', authenticate, createSale);
//Expense Category
router.get('/expense-category', authenticate, getExpenseByCategory);
router.post('/expense-category', authenticate, createExpenseByCategory);
//Expenses
router.get('/expenses', authenticate, getExpenses);
router.post('/expenses', authenticate, createExpense);

export default router;