import { Router } from "express";
import { createUser, getUser, updateUser } from "../controllers/user.controller";

const router = Router();

router.get('/', getUser);
router.post('/', createUser);
router.put('/', updateUser);

export default router;