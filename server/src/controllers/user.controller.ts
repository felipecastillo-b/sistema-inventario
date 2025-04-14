import { Request, Response } from "express";
import { createUserService, getUserService, updateUserService } from "../services/user.service";

export const getUser = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const user = await getUserService();

        res.json(
            user
        )
    } catch (error) {
        console.error('Error get user', error);
        res.status(500).json({ error: 'Error get user' });
    }
}

export const createUser = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { userId, name, email, password, roleId, statusId } = req.body;
        const user = await createUserService(userId, name, email, password, roleId, statusId);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error create user', error);
        res.status(500).json({ error: 'Error create user' });
    }
};

export const updateUser = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { userId, name, email, password, roleId, statusId } = req.body;
        const updatedUser = await updateUserService(userId, name, email, password, roleId, statusId);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error update user', error);
        res.status(500).json({ error: 'Error update user' });
    }
}