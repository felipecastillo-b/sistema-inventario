import prisma from "../configs/prisma.config";

// Purchases

export const getPurchasesService = async () => {
    return await prisma.purchases.findMany({
        include: {
            product: true,
        }
    });
};

export const createPurchaseService = async (
    purchaseId: string,
    productId: string,
    quantity: number,
    unitCost: number,
    totalCost: number
) => {
    // Verificar que las relaciones existan antes de crear
    const [product] = await Promise.all([
        prisma.products.findUnique({ where: { productId } }),
    ]);

    if (!product) throw new Error(`Product with ID ${productId} not found`);

    // transaccion
    return await prisma.$transaction(async (prisma) => {
        // actualiza el producto primero
        const updatedProduct = await prisma.products.update({
            where: { productId },
            data: {
                stockQuantity: {
                    increment: quantity
                }
            }
        });

        // crea la compra
        const purchase = await prisma.purchases.create({
            data: {
                purchaseId,
                product: { connect: { productId } },
                quantity,
                unitCost,
                totalCost,
            },
            include: {
                product: true,
            }
        });

        return { 
            purchase, 
            product: updatedProduct 
        };
    });
};

// Update no se debe realizar
// quizas solo lo pueda realizar el administrador, debo pensarlo bien

// Sales

export const getSalesService = async () => {
    return await prisma.sales.findMany({
        include: {
            product: true,
            client: true,
        }
    });
};

export const createSaleService = async (
    saleId: string,
    productId: string,
    clientId: string,
    quantity: number,
    unitPrice: number,
    totalAmount: number
) => {
    // Verificar que las relaciones existan antes de crear
    const [product] = await Promise.all([
        prisma.products.findUnique({ where: { productId } }),
    ]);
    const [client] = await Promise.all([
        prisma.clients.findUnique({ where: { clientId } }),
    ]);

    if (!product) throw new Error(`Product with ID ${productId} not found`);
    if (!client) throw new Error(`Client with ID ${clientId} not found`);

    // transaccion
    return await prisma.$transaction(async (prisma) => {
        // actualiza el producto primero
        const updatedProduct = await prisma.products.update({
            where: { productId },
            data: {
                stockQuantity: {
                    decrement: quantity
                }
            }
        });

        // crea la venta
        const sale = await prisma.sales.create({
            data: {
                saleId,
                product: { connect: { productId } },
                client: { connect: { clientId } },
                quantity,
                unitPrice,
                totalAmount,
            },
            include: {
                product: true,
                client: true,
            }
        });

        return { 
            sale, 
            product: updatedProduct 
        };
    });
};

// Expense Category

export const getExpenseByCategoryService = async () => {
    return await prisma.expenseByCategory.findMany();
};

export const createExpenseByCategoryService = async (expenseByCategoryId: string, name: string, description: string) => {
    return await prisma.expenseByCategory.create({
        data: {
            expenseByCategoryId,
            name,
            description,
        },
    });
};

// Expenses

export const getExpensesService = async () => {
    return await prisma.expenses.findMany({
        include: {
            expenseByCategory: true,
        }
    });
};

export const createExpenseService = async (expenseId: string, expenseByCategoryId: string, description: string, amount: number) => {
    // Verificar que la relacion exista antes de crear
    const [expenseByCategory] = await Promise.all([
        prisma.expenseByCategory.findUnique({ where: { expenseByCategoryId } }),
    ]);

    if (!expenseByCategory) throw new Error(`Category with ID ${expenseByCategoryId} not found`);

    return await prisma.expenses.create({
        data: {
            expenseId,
            expenseByCategory: { connect: { expenseByCategoryId } },
            description,
            amount,
        },
        include: {
            expenseByCategory: true,
        }
    });
};