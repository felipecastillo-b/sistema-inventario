import { Request, Response } from "express";
import { getClientsService } from "../services/client.service";

export const getClients = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const clients = await getClientsService();

        res.json(clients);
    } catch (error) {
        console.log('Error get clients', error);
        res.status(500).json({ error: 'Error get clients' });
    }
}