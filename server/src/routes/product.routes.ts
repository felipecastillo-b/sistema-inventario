import { Router } from "express";
import { createProduct, getProducts, updateProduct } from "../controllers/product.controller";

const router = Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.put('/', updateProduct);

export default router;