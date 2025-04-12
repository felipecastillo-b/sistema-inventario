import { Router } from "express";
import { createStatus, getStatus, updateStatus } from "../controllers/status.controller";

const router = Router();

router.get('/', getStatus);
router.post('/', createStatus);
router.put('/', updateStatus);

export default router;