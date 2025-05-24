import { Request, Response } from "express";
import { createProductService, getProductsService, updateProductService } from "../services/product.service";
import cloudinary from "../configs/cloudinary.config";

export const getProducts = async (req: Request, res: Response): Promise<void> => {
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

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        // Convertir valores numericos de string a number
        const productId = req.body.productId;
        const categoryId = req.body.categoryId;
        const supplierId = req.body.supplierId;
        const statusId = parseInt(req.body.statusId, 10);
        const name = req.body.name;
        const price = parseFloat(req.body.price);
        let image_url = req.body.image_url;

        if (req.file) {
            const fileBase64 = req.file.buffer.toString('base64');
            const fileUri = `data:${req.file.mimetype};base64,${fileBase64}`;
            
            const result = await cloudinary.uploader.upload(fileUri, {
                folder: 'inventory',
            });
            image_url = result.secure_url;
        }

        const product = await createProductService(
            productId, 
            categoryId, 
            supplierId, 
            statusId, 
            name, 
            price, 
            image_url
        );
        
        res.status(201).json(product);
    } catch (error) {
        console.error('Error create products', error);
        res.status(500).json({ error: 'Error create products' });
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.body.productId;
        const categoryId = req.body.categoryId;
        const supplierId = req.body.supplierId;
        const statusId = parseInt(req.body.statusId, 10);
        const name = req.body.name;
        const price = parseFloat(req.body.price);
        const rating = parseInt(req.body.rating, 10) || 0;
        const stockQuantity = parseInt(req.body.stockQuantity, 10) || 0;
        const stockMinimum = parseInt(req.body.stockMinimum, 10) || 0;
        let image_url = req.body.image_url;

        // Manejar nueva imagen si se subio
        if (req.file) {
            const fileBase64 = req.file.buffer.toString('base64');
            const fileUri = `data:${req.file.mimetype};base64,${fileBase64}`;
            
            const result = await cloudinary.uploader.upload(fileUri, {
                folder: 'inventory',
            });
            image_url = result.secure_url;
        }

        const updatedProduct = await updateProductService(
            productId, 
            categoryId, 
            supplierId, 
            statusId, 
            name, 
            price, 
            rating, 
            stockQuantity, 
            stockMinimum,
            image_url
        );
        
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error update product', error);
        res.status(500).json({ error: 'Error update product' });
    }
}