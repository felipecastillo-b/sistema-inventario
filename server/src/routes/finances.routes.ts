import { Router } from "express";
import { createPurchase, getPurchases } from "../controllers/finances.controller";

const router = Router();

//Purchases
router.get('/purchases', getPurchases);
router.post('/purchases', createPurchase);
//Sales
//Expenses

export default router;