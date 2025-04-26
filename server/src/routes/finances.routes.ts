import { Router } from "express";
import { createExpense, createExpenseByCategory, createPurchase, createSale, getExpenseByCategory, getExpenses, getPurchases, getSales } from "../controllers/finances.controller";

const router = Router();

//Purchases
router.get('/purchases', getPurchases);
router.post('/purchases', createPurchase);
//Sales
router.get('/sales', getSales);
router.post('/sales', createSale);
//Expense Category
router.get('/expense-category', getExpenseByCategory);
router.post('/expense-category', createExpenseByCategory);
//Expenses
router.get('/expenses', getExpenses);
router.post('/expenses', createExpense);

export default router;