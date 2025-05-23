import { Router } from "express";
import { getSummary } from "../controllers/dashboard.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get('/', authenticate, getSummary);

export default router;