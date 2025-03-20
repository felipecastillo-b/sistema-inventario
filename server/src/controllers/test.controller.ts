import { Request, Response } from "express";

export const getTest = async (req: Request, res: Response): Promise<void> => {
    try {
        res.send('Hello World');
    } catch (error) {
        console.error('Error al obtener test', error);
        res.status(500).json({ error: 'Error al obtener los test' });
    }
};