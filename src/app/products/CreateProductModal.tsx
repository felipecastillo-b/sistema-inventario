import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { v4 } from "uuid";
import Header from "../(components)/Header";
import { useGetCategoryQuery, useGetSupplierQuery, useGetStatusQuery } from "@/state/api";

type ProductFormData = {
    productId: string;
    categoryId: string;
    supplierId: string;
    statusId: number;
    name: string;
    price: number;
    rating: number;
    stockQuantity: number;
    stockMinimum: number;
    image_url?: string;
};

type CreateProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (formData: FormData) => void;
};

const CreateProductModal = ({
    isOpen,
    onClose,
    onCreate,
}: CreateProductModalProps) => {
    const { data: categories = [] } = useGetCategoryQuery();
    const { data: suppliers = [] } = useGetSupplierQuery();
    const { data: statuses = [] } = useGetStatusQuery();
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [formData, setFormData] = useState<ProductFormData>({
        productId: v4(),
        categoryId: categories[0]?.categoryId || "",
        supplierId: suppliers[0]?.supplierId || "",
        statusId: statuses.find(s => s.statusId >= 100)?.statusId || 100,
        name: "",
        price: 0,
        rating: 0,
        stockQuantity: 0,
        stockMinimum: 0,
    });

    useEffect(() => {
        if (isOpen) {
            setFormData({
                productId: v4(),
                categoryId: categories[0]?.categoryId || "",
                supplierId: suppliers[0]?.supplierId || "",
                statusId: statuses.find(s => s.statusId >= 100)?.statusId || 100,
                name: "",
                price: 0,
                rating: 0,
                stockQuantity: 0,
                stockMinimum: 0,
            });
            setImageFile(null); // Resetear la imagen al abrir el modal
        }
    }, [isOpen, categories, suppliers, statuses]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.categoryId || !formData.supplierId || formData.statusId === 0) {
            alert('Please fill all required fields');
            return;
        }

        const formDataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value.toString());
        });

        if (imageFile) {
            formDataToSend.append('image', imageFile);
        }

        onCreate(formDataToSend);
        onClose();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
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

    if (!isOpen) return null;

    const labelStyles = "block text-sm font-medium text-gray-700 mb-1";
    const inputStyles = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white";

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <Header name="Create New Product" />
                <form onSubmit={handleSubmit} className="mt-5 space-y-4" encType="multipart/form-data">
                    {/* Product Name */}
                    <div>
                        <label htmlFor="name" className={labelStyles}>
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Product Name"
                            onChange={handleChange}
                            value={formData.name}
                            className={inputStyles}
                            required
                        />
                    </div>

                    {/* Product Price */}
                    <div>
                        <label htmlFor="price" className={labelStyles}>
                            Price
                        </label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            onChange={handleChange}
                            value={formData.price}
                            className={inputStyles}
                            required
                        />
                    </div>

                    {/* Product Category */}
                    <div>
                        <label htmlFor="categoryId" className={labelStyles}>
                            Category
                        </label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            onChange={handleSelectChange}
                            value={formData.categoryId}
                            className={inputStyles}
                            required
                        >
                            {categories.map((category) => (
                                <option key={category.categoryId} value={category.categoryId}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Product Supplier */}
                    <div>
                        <label htmlFor="supplierId" className={labelStyles}>
                            Supplier
                        </label>
                        <select
                            id="supplierId"
                            name="supplierId"
                            onChange={handleSelectChange}
                            value={formData.supplierId}
                            className={inputStyles}
                            required
                        >
                            {suppliers.map((supplier) => (
                                <option key={supplier.supplierId} value={supplier.supplierId}>
                                    {supplier.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Product Status */}
                    <div>
                        <label htmlFor="statusId" className={labelStyles}>
                            Status
                        </label>
                        <select
                            id="statusId"
                            name="statusId"
                            onChange={handleSelectChange}
                            value={formData.statusId}
                            className={inputStyles}
                            required
                        >
                            {statuses
                                .filter((status) => status.statusId >= 100 && status.statusId <= 199)
                                .map((status) => (
                                    <option key={status.statusId} value={status.statusId}>
                                        {status.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <label htmlFor="image" className={labelStyles}>
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setImageFile(e.target.files[0]);
                            }
                        }}
                        className={inputStyles}
                    />

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                        >
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProductModal;