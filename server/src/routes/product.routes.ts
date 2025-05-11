import { Router } from "express";
import { createProduct, getProducts, updateProduct } from "../controllers/product.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get('/', authenticate, getProducts);
router.post('/', authenticate, createProduct);
router.put('/', authenticate, updateProduct);

export default router;