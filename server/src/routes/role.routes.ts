import { Router } from "express";
import { createRole, getRole, updateRole } from "../controllers/role.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/role.middleware";

const router = Router();

router.get('/', authenticate, authorizeRole([1]), getRole);
router.post('/', authenticate, authorizeRole([1]), createRole);
router.put('/', authenticate, authorizeRole([1]), updateRole);

export default router;