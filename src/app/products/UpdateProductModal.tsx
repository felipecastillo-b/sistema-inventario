import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Header from "../(components)/Header";
import { useGetCategoryQuery, useGetSupplierQuery, useGetStatusQuery } from "@/state/api";

type ProductFormData = {
    productId: string;
    categoryId: string;
    supplierId: string;
    statusId: number
    name: string;
    price: number;
    rating: number;
    stockQuantity: number;
    stockMinimum: number;
};

type UpdateProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (formData: ProductFormData) => void;
    initialData: ProductFormData | null;
};

const UpdateProductModal = ({ isOpen, onClose, onUpdate, initialData }: UpdateProductModalProps) => {
    const { data: category } = useGetCategoryQuery();
    const { data: supplier } = useGetSupplierQuery();
    const { data: status } = useGetStatusQuery();
    const [formData, setFormData] = useState<ProductFormData>({
        productId: "",
        categoryId: "",
        supplierId: "",
        statusId: 0,
        name: "",
        price: 0,
        rating: 0,
        stockQuantity: 0,
        stockMinimum: 0,
    });

    useEffect(() => {
        if (initialData) setFormData(initialData);
    }, [initialData]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['statusId', 'stockQuantity', 'stockMinimum'].includes(name) 
                ? Number(value) 
                : ['price', 'rating'].includes(name)
                ? parseFloat(value) || 0
                : value
        }));
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['statusId', 'stockQuantity', 'stockMinimum'].includes(name) 
                ? Number(value) 
                : value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onUpdate(formData);
        onClose();
    };

    if (!isOpen) return null;

    const labelStyles = "block text-sm font-medium text-gray-700";
    const inputStyles = "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md text-white";

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <Header name="Update Product" />
                <form onSubmit={handleSubmit} className="mt-5">
                    <label htmlFor="productName" className={labelStyles}>Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputStyles}
                        required
                    />

                    <label htmlFor="productPrice" className={labelStyles}>Price</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className={inputStyles}
                        required
                    />

                    <label htmlFor="productCategory" className={labelStyles}>
                        Category
                    </label>
                    <select
                        name="categoryId"
                        onChange={handleSelectChange}
                        value={formData.categoryId}
                        className={inputStyles}
                        required
                    >
                        {category?.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="productSupplier" className={labelStyles}>
                        Supplier
                    </label>
                    <select
                        name="supplierId"
                        onChange={handleSelectChange}
                        value={formData.supplierId}
                        className={inputStyles}
                        required
                    >
                        {supplier?.map((supplier) => (
                            <option key={supplier.supplierId} value={supplier.supplierId}>
                                {supplier.name}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="productStatusId" className={labelStyles}>
                        Status
                    </label>
                    <select
                        name="statusId"
                        onChange={handleSelectChange}
                        value={formData.statusId}
                        className={inputStyles}
                        required
                    >
                        {status?.filter((status) => status.statusId >= 100 && status.statusId <= 199)
                            .map((status) => (
                                <option key={status.statusId} value={status.statusId}>
                                    {status.name}
                                </option>
                        ))}
                    </select>

                    <label htmlFor="productStockMinimum" className={labelStyles}>Stock Minimum</label>
                    <input
                        type="text"
                        name="stockMinimum"
                        value={formData.stockMinimum}
                        onChange={handleChange}
                        className={inputStyles}
                        required
                    />

                    <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Update</button>
                    <button type="button" className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProductModal;
