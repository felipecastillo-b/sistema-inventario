import prisma from "../configs/prisma.config";

export const getClientsService = async () => {
    return await prisma.clients.findMany();
}

export const createClientService = async (clientId: string, name: string, email: string, phone: string, address: string) => {
    return await prisma.clients.create({
        data: {
            clientId,
            name,
            email,
            phone,
            address,
        },
    });
};

export const updateClientService = async (clientId: string, name: string, email: string, phone: string, address: string) => {
    return await prisma.clients.update({
        where: { clientId },
        data: { name, email, phone, address },
    })
}