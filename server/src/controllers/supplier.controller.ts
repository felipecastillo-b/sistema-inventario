import { Request, Response } from "express";
import { createSupplierService, getSupplierService, updateSupplierService } from "../services/supplier.service";

export const getSupplier = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const supplier = await getSupplierService();

        res.json(
            supplier
        )
    } catch (error) {
        console.error('Error get supplier', error);
        res.status(500).json({ error: 'Error get supplier' });
    }
}

export const createSupplier = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { supplierId, name, email, phone, address } = req.body;
        const supplier = await createSupplierService(supplierId, name, email, phone, address);
        res.status(201).json(supplier);
    } catch (error) {
        console.error('Error create supplier', error);
        res.status(500).json({ error: 'Error create supplier' });
    }
};

export const updateSupplier = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { supplierId, name, email, phone, address } = req.body;
        const updatedSupplier = await updateSupplierService(supplierId, name, email, phone, address);
        res.status(200).json(updatedSupplier);
    } catch (error) {
        console.error('Error update supplier', error);
        res.status(500).json({ error: 'Error update supplier' });
    }
}