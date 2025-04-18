import { Request, Response } from "express";
import { createProductService, getProductsService, updateProductService } from "../services/product.service";

export const getProducts = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const search = req.query.search?.toString();
        const products = await getProductsService(search);

        res.json(
            products
        )
    } catch (error) {
        console.error('Error get products', error);
        res.status(500).json({ error: 'Error get products' });
    }
}

export const createProduct = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { productId, categoryId, supplierId, statusId, name, price } = req.body;
        const product = await createProductService(productId, categoryId, supplierId, statusId, name, price);
        res.status(201).json(product);
    } catch (error) {
        console.error('Error create products', error);
        res.status(500).json({ error: 'Error create products' });
    }
};

export const updateProduct = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { productId, categoryId, supplierId, statusId, name, price, rating, stockQuantity, stockMinimum } = req.body;
        const updatedProduct = await updateProductService(productId, categoryId, supplierId, statusId, name, price, rating, stockQuantity, stockMinimum);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error update product', error);
        res.status(500).json({ error: 'Error update product' });
    }
}