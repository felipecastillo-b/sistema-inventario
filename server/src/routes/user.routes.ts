import { Router } from "express";
import { createUser, getUser, updateUser } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/role.middleware";

const router = Router();

router.get('/', authenticate, authorizeRole([1]), getUser);
router.post('/', authenticate, authorizeRole([1]), createUser);
router.put('/', authenticate, authorizeRole([1]), updateUser);

export default router;