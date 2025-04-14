import { Request, Response } from "express";
import { createRoleService, getRoleService, updateRoleService } from "../services/role.service";

export const getRole = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const role = await getRoleService();

        res.json(
            role
        )
    } catch (error) {
        console.error('Error get role', error);
        res.status(500).json({ error: 'Error get role' });
    }
}

export const createRole = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { name, description } = req.body;
        const role = await createRoleService(name, description);
        res.status(201).json(role);
    } catch (error) {
        console.error('Error create role', error);
        res.status(500).json({ error: 'Error create role' });
    }
};

export const updateRole = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { roleId, name, description } = req.body;
        const updatedRole = await updateRoleService(roleId, name, description);
        res.status(200).json(updatedRole);
    } catch (error) {
        console.error('Error update role', error);
        res.status(500).json({ error: 'Error update role' });
    }
}