import { Request, Response } from "express";
import { getClientsService, createClientService, updateClientService } from "../services/client.service";

export const getClients = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const clients = await getClientsService();

        res.json(clients);
    } catch (error) {
        console.log('Error get clients', error);
        res.status(500).json({ error: 'Error get clients' });
    }
}

export const createClient = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { clientId, name, email, phone, address } = req.body;
        const client = await createClientService(clientId, name, email, phone, address);
        res.status(201).json(client);
    } catch (error) {
        console.error('Error create client', error);
        res.status(500).json({ error: 'Error create client' });
    }
};

export const updateClient = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { clientId, name, email, phone, address } = req.body;
        const updatedClient = await updateClientService(clientId, name, email, phone, address);
        res.status(200).json(updatedClient);
    } catch (error) {
        console.error('Error update client', error);
        res.status(500).json({ error: 'Error update client' });
    }
}