import prisma from "../configs/prisma.config";

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