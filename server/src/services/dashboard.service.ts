import prisma from "../configs/prisma.config";

export const getSummaryService = async () => {
    const [salesSummary, purchaseSummary, expenseSummary] = await Promise.all([
        prisma.sales.aggregate({
            _sum: { totalAmount: true }
        }),
        prisma.purchases.aggregate({
            _sum: { totalCost: true }
        }),
        prisma.expenses.aggregate({
            _sum: { amount: true }
        }),
    ])

    const topProducts = await prisma.sales.groupBy({
        by: ['productId'],
        _sum: { totalAmount: true },
        orderBy: {
            _sum: { totalAmount: 'desc' }
        },
        take: 5
    })

    const productDetails = await Promise.all(topProducts.map(async (p) => {
        const product = await prisma.products.findUnique({
            where: { productId: p.productId },
            select: { name: true, image_url: true }
        })
        return {
            productId: p.productId,
            name: product?.name ?? 'Unknown',
            image_url: product?.image_url,
            totalSold: p._sum.totalAmount
        }
    }))

    const lowStock = await prisma.products.findMany({
        where: {
            stockQuantity: {
                lt: prisma.products.fields.stockMinimum
            }
        },
        select: {
            productId: true,
            name: true,
            stockQuantity: true,
            stockMinimum: true
        }
    })

    const activeClients = await prisma.clients.count({
        where: {
            sales: {
                some: {}
            }
        }
    })

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlySales = await prisma.sales.aggregate({
        _sum: { totalAmount: true },
        where: {
            timestamp: {
                gte: startOfMonth
            }
        }
    })

    const totalSales = salesSummary._sum.totalAmount ?? 0;
    const totalPurchases = purchaseSummary._sum.totalCost ?? 0;
    const totalExpenses = expenseSummary._sum.amount ?? 0;
    const netProfit = totalSales - totalPurchases - totalExpenses;
    const profitMargin = totalSales ? (netProfit / totalSales) * 100 : 0;
    const lowStockCount = lowStock.length;

    return {
        sales: totalSales,
        purchases: totalPurchases,
        expenses: totalExpenses,
        netProfit: netProfit,
        profitMargin,
        activeClients,
        monthlySales: monthlySales._sum.totalAmount ?? 0,
        topProducts: productDetails,
        lowStock,
        lowStockCount
    }
};