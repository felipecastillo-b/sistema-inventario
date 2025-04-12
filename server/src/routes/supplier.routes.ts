import { Router } from "express";
import { createSupplier, getSupplier, updateSupplier } from "../controllers/supplier.controller";

const router = Router();

router.get('/', getSupplier);
router.post('/', createSupplier);
router.put('/', updateSupplier);

export default router;