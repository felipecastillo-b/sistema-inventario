import { Router } from "express";
import { getClients, createClient, updateClient } from "../controllers/client.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get('/', authenticate, getClients);
router.post('/', authenticate, createClient);
router.put('/', authenticate, updateClient);

export default router;