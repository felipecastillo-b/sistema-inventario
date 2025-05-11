import { Router } from "express";
import { createSupplier, getSupplier, updateSupplier } from "../controllers/supplier.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get('/', authenticate, getSupplier);
router.post('/', authenticate, createSupplier);
router.put('/', authenticate, updateSupplier);

export default router;