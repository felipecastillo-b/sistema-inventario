import { Request, Response } from "express";
import { createProductService, getProductsService } from "../services/product.service";

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
        const { productId, name, price, rating, stockQuantity, stockMinimum } = req.body;
        const product = await createProductService(productId, name, price, rating, stockQuantity, stockMinimum);
        res.status(201).json(product);
    } catch (error) {
        console.error('Error create products', error);
        res.status(500).json({ error: 'Error create products' });
    }
};