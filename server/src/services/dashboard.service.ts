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

    return {
        sales: salesSummary._sum.totalAmount ?? 0,
        purchases: purchaseSummary._sum.totalCost ?? 0,
        expenses: expenseSummary._sum.amount ?? 0,
        topProducts: productDetails,
        lowStock
    }
};