import { Router } from "express";
import { createStatus, getStatus, updateStatus } from "../controllers/status.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/role.middleware";

const router = Router();

router.get('/', authenticate, authorizeRole([1]), getStatus);
router.post('/', authenticate, authorizeRole([1]), createStatus);
router.put('/', authenticate, authorizeRole([1]), updateStatus);

export default router;