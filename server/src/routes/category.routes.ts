import { Router } from "express";
import { createCategory, getCategory, updateCategory } from "../controllers/category.controller";

const router = Router();

router.get('/', getCategory);
router.post('/', createCategory);
router.put('/', updateCategory);

export default router;