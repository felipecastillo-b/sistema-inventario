import { Router } from "express";
import { createRole, getRole, updateRole } from "../controllers/role.controller";

const router = Router();

router.get('/', getRole);
router.post('/', createRole);
router.put('/', updateRole);

export default router;