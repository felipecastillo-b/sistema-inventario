import { Request, Response } from "express";
import { createPurchaseService, createSaleService, getPurchasesService, getSalesService } from "../services/finances.service";

// Purchases

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

// Sales

export const getSales = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const sales = await getSalesService();

        res.json(
            sales
        )
    } catch (error) {
        console.error('Error get sales', error);
        res.status(500).json({ error: 'Error get sales' });
    }
}

export const createSale = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { saleId, productId, clientId, quantity, unitPrice, totalAmount } = req.body;
        const sale = await createSaleService(saleId, productId, clientId, quantity, unitPrice, totalAmount);
        res.status(201).json(sale);
    } catch (error) {
        console.error('Error create sale', error);
        res.status(500).json({ error: 'Error create sale' });
    }
};