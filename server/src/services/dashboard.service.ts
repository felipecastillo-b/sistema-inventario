/*import prisma from "../configs/prisma.config";

export const getPopularProducts = async () => {
    return await prisma.products.findMany({
        take: 15,
        orderBy: {
            stockQuantity: "desc",
        },
    });
};

export const getSalesSummary = async () => {
    return await prisma.salesSummary.findMany({
        take: 5,
        orderBy: {
            date: "desc",
        },
    });
};

export const getPurchaseSummary = async () => {
    return await prisma.purchaseSummary.findMany({
        take: 5,
        orderBy: {
            date: "desc",
        },
    });
};

export const getExpenseSummary = async () => {
    return await prisma.expenseSummary.findMany({
        take: 5,
        orderBy: {
            date: "desc",
        },
    });
};

export const getExpenseByCategorySummaryRaw = async () => {
    return await prisma.expenseByCategory.findMany({
        take: 5,
        orderBy: {
            date: "desc",
        },
    });
};

export const getExpenseByCategory = async () => {
    const expenses = await getExpenseByCategorySummaryRaw();
    return expenses.map((item) => ({
        ...item,
        amount: item.amount.toString(),
    }))
}*/