/*import { Request, Response } from "express";
import { getExpensesByCategoryService } from "../services/expense.service";

export const getExpensesByCategory = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const expenseByCategoryRaw = await getExpensesByCategoryService();

        const expenseByCategorySummary = expenseByCategoryRaw.map(
            (item) => ({
                ...item,
                amount: item.amount.toString(),
            })
        );

        res.json(expenseByCategorySummary);
    } catch (error) {
        console.log('Error get expenses by category summary', error);
        res.status(500).json({ error: 'Error get expenses by category summary' });
    }
}*/