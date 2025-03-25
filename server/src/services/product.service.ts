import prisma from "../configs/prisma.config";

export const getProductsService = async (search?: string) => {
    return await prisma.products.findMany({
        where: {
            name: {
                contains: search,
                mode: 'insensitive'
            }
        },
    });
};

export const createProductService = async (productId: string, name: string, price: number, rating: number, stockQuantity: number, stockMinimum: number) => {
    return await prisma.products.create({
        data: {
            productId, 
            name, 
            price, 
            rating, 
            stockQuantity, 
            stockMinimum,
        },
    });
};