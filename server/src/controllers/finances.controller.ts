import { Request, Response } from "express";
import { createPurchaseService, getPurchasesService } from "../services/finances.service";

export const getPurchases = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const purchases = await getPurchasesService();

        res.json(
            purchases
        )
    } catch (error) {
        console.error('Error get purchases', error);
        res.status(500).json({ error: 'Error get purchases' });
    }
}

export const createPurchase = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { purchaseId, productId, quantity, unitCost, totalCost } = req.body;
        const purchase = await createPurchaseService(purchaseId, productId, quantity, unitCost, totalCost);
        res.status(201).json(purchase);
    } catch (error) {
        console.error('Error create purchase', error);
        res.status(500).json({ error: 'Error create purchase' });
    }
};