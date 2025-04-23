import { Router } from "express";
import { createPurchase, createSale, getPurchases, getSales } from "../controllers/finances.controller";

const router = Router();

//Purchases
router.get('/purchases', getPurchases);
router.post('/purchases', createPurchase);
//Sales
router.get('/sales', getSales);
router.post('/sales', createSale);
//Expenses

export default router;