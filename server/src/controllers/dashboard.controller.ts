import { Request, Response } from "express";
import { getSummaryService } from "../services/dashboard.service";

export const getSummary = async ( req: Request, res: Response): Promise<void> => {
    try {
        const summary = await getSummaryService()
        res.json(summary)
    } catch (error) {
        console.error('Error get dashboard summary', error);
        res.status(500).json({ error: 'Error get dashboard summary' });
    }
}