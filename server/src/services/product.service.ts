import prisma from "../configs/prisma.config";

export const getProductsService = async (search?: string) => {
    return await prisma.products.findMany({
        where: {
            name: {
                contains: search,
                mode: 'insensitive'
            }
        },
        include: {
            category: true,
            supplier: true,
            status: true,
        }
    });
};

export const createProductService = async (
    productId: string,
    categoryId: string,
    supplierId: string,
    statusId: number,
    name: string,
    price: number,
    image_url?: string,
) => {
    // Verificar que las relaciones existan antes de crear
    const [category, supplier, status] = await Promise.all([
        prisma.category.findUnique({ where: { categoryId } }),
        prisma.suppliers.findUnique({ where: { supplierId } }),
        prisma.status.findUnique({ where: { statusId } })
    ]);

    if (!category) throw new Error(`Category with ID ${categoryId} not found`);
    if (!supplier) throw new Error(`Supplier with ID ${supplierId} not found`);
    if (!status) throw new Error(`Status with ID ${statusId} not found`);

    return await prisma.products.create({
        data: {
            productId,
            category: { connect: { categoryId } }, // Sintaxis correcta para relaciones
            supplier: { connect: { supplierId } },
            status: { connect: { statusId } },
            name, 
            price, 
            rating: 0, 
            stockQuantity: 0, 
            stockMinimum: 0,
            image_url,
        },
        include: {
            category: true,
            supplier: true,
            status: true,
        }
    });
};

export const updateProductService = async (
    productId: string,
    categoryId: string,
    supplierId: string,
    statusId: number,
    name: string,
    price: number,
    rating: number,
    stockQuantity: number,
    stockMinimum: number,
    image_url?: string
) => {
    // Verifica que el producto exista
    const product = await prisma.products.findUnique({
        where: { productId },
    });

    if (!product) throw new Error(`Product with ID ${productId} not found`);

    // Verifica que las relaciones existan
    const [category, supplier, status] = await Promise.all([
        prisma.category.findUnique({ where: { categoryId } }),
        prisma.suppliers.findUnique({ where: { supplierId } }),
        prisma.status.findUnique({ where: { statusId } }),
    ]);

    if (!category) throw new Error(`Category with ID ${categoryId} not found`);
    if (!supplier) throw new Error(`Supplier with ID ${supplierId} not found`);
    if (!status) throw new Error(`Status with ID ${statusId} not found`);

    return await prisma.products.update({
        where: { productId },
        data: {
            name,
            price,
            rating,
            stockQuantity,
            stockMinimum,
            categoryId,
            supplierId,
            statusId,
            image_url: image_url !== undefined ? image_url : undefined, // Solo actualiza si se proporciona
        },
        include: {
            category: true,
            supplier: true,
            status: true,
        },
    });
};