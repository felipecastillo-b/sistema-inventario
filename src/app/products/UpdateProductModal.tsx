import { ChangeEvent, FormEvent, useState, useEffect } from "react";
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
    image_url?: string | null;
};

type UpdateProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (formData: FormData) => void;
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
        image_url: null,
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && initialData) {
            const initialFormData = {
                ...initialData,
                image_url: initialData.image_url || null
            };
            setFormData(initialFormData);
            setPreviewImage(initialFormData.image_url || null);
        }
    }, [isOpen, initialData]);

    const resetForm = () => {
        setFormData({
            productId: "",
            categoryId: "",
            supplierId: "",
            statusId: 0,
            name: "",
            price: 0,
            rating: 0,
            stockQuantity: 0,
            stockMinimum: 0,
            image_url: null,
        });
        setImageFile(null);
        setPreviewImage(null);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['statusId', 'stockQuantity', 'stockMinimum'].includes(name)
                ? Number(value)
                : ['price'].includes(name)
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

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formDataToSend.append(key, value.toString());
            }
        });

        if (imageFile) {
            formDataToSend.append('image', imageFile);
        }

        onUpdate(formDataToSend);
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    const labelStyles = "block text-sm font-medium text-gray-700 mb-1";
    const inputStyles = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white";

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <Header name="Update Product" />
                <form onSubmit={handleSubmit} className="mt-5 space-y-4" encType="multipart/form-data">
                    {/* Preview de la imagen */}
                    {previewImage && (
                        <div className="mb-4 flex justify-center">
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="h-32 object-contain rounded-md"
                            />
                        </div>
                    )}

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
                            {category?.map((category) => (
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
                            {supplier?.map((supplier) => (
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
                            {status?.filter((status) => status.statusId >= 100 && status.statusId <= 199)
                                .map((status) => (
                                    <option key={status.statusId} value={status.statusId}>
                                        {status.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Stock Minimum */}
                    <div>
                        <label htmlFor="stockMinimum" className={labelStyles}>
                            Stock Minimum
                        </label>
                        <input
                            type="text"
                            id="stockMinimum"
                            name="stockMinimum"
                            value={formData.stockMinimum}
                            onChange={handleChange}
                            className={inputStyles}
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label htmlFor="image" className={labelStyles}>
                            Update Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={inputStyles}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProductModal;