import prisma from "../configs/prisma.config";

export const getExpensesByCategoryService = async () => {
    return await prisma.expenseByCategory.findMany(
        {
            orderBy: {
                date: "desc",
            },
        }
    );
}