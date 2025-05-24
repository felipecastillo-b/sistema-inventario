import { Router } from "express";
import { createProduct, getProducts, updateProduct } from "../controllers/product.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.get('/', authenticate, getProducts);
router.post('/', authenticate, upload.single("image"), createProduct);
router.put('/', authenticate, upload.single("image"), updateProduct);

export default router;