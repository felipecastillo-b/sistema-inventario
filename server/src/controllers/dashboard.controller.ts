import { Request, Response } from "express";
import { getExpenseByCategory, getExpenseSummary, getPopularProducts, getPurchaseSummary, getSalesSummary } from "../services/dashboard.service";

export const getDashboardMetrics = async ( req: Request, res: Response): Promise<void> => {
    try {
        const popularProducts = await getPopularProducts();
        const salesSummary = await getSalesSummary();
        const purchaseSummary = await getPurchaseSummary();
        const expenseSummary = await getExpenseSummary();
        const expenseByCategory = await getExpenseByCategory();

        res.json({
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategory,
        })
    } catch (error) {
        console.error('Error get dashboard metrics', error);
        res.status(500).json({ error: 'Error get dashboard metrics' });
    }
}