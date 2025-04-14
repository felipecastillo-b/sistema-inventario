import prisma from "../configs/prisma.config";

export const getCategoryService = async () => {
    return await prisma.category.findMany();
};

export const createCategoryService = async (categoryId: string, name: string, description: string) => {
    return await prisma.category.create({
        data: {
            categoryId,
            name,
            description,
        },
    });
};

export const updateCategoryService = async (categoryId: string, name: string, description: string) => {
    return await prisma.category.update({
        where: { categoryId },
        data: { name, description },
    })
}