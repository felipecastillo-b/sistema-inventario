import { Request, Response } from "express";
import { createStatusService, getStatusService, updateStatusService } from "../services/status.service";

export const getStatus = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const status = await getStatusService();

        res.json(
            status
        )
    } catch (error) {
        console.error('Error get status', error);
        res.status(500).json({ error: 'Error get status' });
    }
}

export const createStatus = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { statusId, name, description } = req.body;
        const status = await createStatusService(statusId, name, description);
        res.status(201).json(status);
    } catch (error) {
        console.error('Error create status', error);
        res.status(500).json({ error: 'Error create status' });
    }
};

export const updateStatus = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { statusId, name, description } = req.body;
        const updatedStatus = await updateStatusService(statusId, name, description);
        res.status(200).json(updatedStatus);
    } catch (error) {
        console.error('Error update status', error);
        res.status(500).json({ error: 'Error update status' });
    }
}