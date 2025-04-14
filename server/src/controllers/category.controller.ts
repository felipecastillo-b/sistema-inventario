import { Request, Response } from "express";
import { createCategoryService, getCategoryService, updateCategoryService } from "../services/category.service";

export const getCategory = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const category = await getCategoryService();

        res.json(
            category
        )
    } catch (error) {
        console.error('Error get category', error);
        res.status(500).json({ error: 'Error get category' });
    }
}

export const createCategory = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { categoryId, name, description } = req.body;
        const category = await createCategoryService(categoryId, name, description);
        res.status(201).json(category);
    } catch (error) {
        console.error('Error create category', error);
        res.status(500).json({ error: 'Error create category' });
    }
};

export const updateCategory = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { categoryId, name, description } = req.body;
        const updatedCategory = await updateCategoryService(categoryId, name, description);
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error('Error update category', error);
        res.status(500).json({ error: 'Error update category' });
    }
}