import { Router } from "express";
import { getClients, createClient, updateClient } from "../controllers/client.controller";

const router = Router();

router.get('/', getClients);
router.post('/', createClient);
router.put('/', updateClient);

export default router;