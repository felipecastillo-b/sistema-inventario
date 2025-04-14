import prisma from "../configs/prisma.config";

export const getRoleService = async () => {
    return await prisma.roles.findMany();
};

export const createRoleService = async (name: string, description: string) => {
    return await prisma.roles.create({
        data: {
            name,
            description,
        },
    });
};

export const updateRoleService = async (roleId: number, name: string, description: string) => {
    return await prisma.roles.update({
        where: { roleId },
        data: { name, description },
    })
}