import prisma from "../configs/prisma.config";

export const getSupplierService = async () => {
    return await prisma.suppliers.findMany();
};

export const createSupplierService = async (supplierId: string, name: string, email: string, phone: string, address: string) => {
    return await prisma.suppliers.create({
        data: {
            supplierId,
            name,
            email,
            phone,
            address,
        },
    });
};

export const updateSupplierService = async (supplierId: string, name: string, email: string, phone: string, address: string) => {
    return await prisma.suppliers.update({
        where: { supplierId },
        data: { name, email, phone, address },
    })
}