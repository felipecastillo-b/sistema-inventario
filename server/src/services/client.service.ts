import prisma from "../configs/prisma.config";

export const getClientsService = async () => {
    return await prisma.clients.findMany();
}