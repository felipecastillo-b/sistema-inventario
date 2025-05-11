import { Router } from "express";
import { createCategory, getCategory, updateCategory } from "../controllers/category.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get('/', authenticate, getCategory);
router.post('/', authenticate, createCategory);
router.put('/', authenticate, updateCategory);

export default router;