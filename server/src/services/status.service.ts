import prisma from "../configs/prisma.config";

export const getStatusService = async () => {
    return await prisma.status.findMany();
};

export const createStatusService = async (statusId: number, name: string, description: string) => {
    return await prisma.status.create({
        data: {
            statusId, 
            name, 
            description
        },
    });
};

export const updateStatusService = async (statusId: number, name: string, description: string) => {
    return await prisma.status.update({
        where: { statusId },
        data: { name, description },
    })
}