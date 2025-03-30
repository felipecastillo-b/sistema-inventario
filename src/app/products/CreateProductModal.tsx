import { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "../(components)/Header";

type ProductFormData = {
    name: string;
    price: number;
    stockQuantity: number;
    stockMinimum: number;
    rating: number;
    //image_url: string; Implementar cloudinary
};

type CreateProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: ( formData: ProductFormData ) => void;
};

const CreateProductModal = ({
    isOpen,
    onClose,
    onCreate,
}: CreateProductModalProps) => {
    const [formData, setFormData] = useState({
        productId: v4(),
        name: "",
        price: 0,
        stockQuantity: 0,
        stockMinimum: 0,
        rating: 0,
        //image_url: "",
    });
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onCreate(formData);
        onClose();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:
                name === "price" || name === "stockQuantity" || name === "stockMinimum" || name === "rating"
                    ? parseFloat(value)
                    : value,
        })
    };

    if (!isOpen) return null;

    const labelCssStyles = "block text-sm font-medium text-gray-700";
    const inputCssStyles = "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md text-white";

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <Header name="Create New Product"/>
                <form onSubmit={handleSubmit} className="mt-5">
                    {/* Product Name */}
                    <label htmlFor="productName" className={labelCssStyles}>
                        Product Name
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Product Name" 
                        onChange={handleChange}
                        value={formData.name}
                        className={inputCssStyles}
                        required
                    />
                    {/* Price */}
                    <label htmlFor="productPrice" className={labelCssStyles}>
                        Price
                    </label>
                    <input 
                        type="number" 
                        name="price" 
                        placeholder="Price" 
                        onChange={handleChange}
                        value={formData.price}
                        className={inputCssStyles}
                        required
                    />
                    {/* Stock Quantity */}
                    <label htmlFor="stockQuantity" className={labelCssStyles}>
                        Stock Quantity
                    </label>
                    <input 
                        type="number" 
                        name="stockQuantity" 
                        placeholder="stockQuantity" 
                        onChange={handleChange}
                        value={formData.stockQuantity}
                        className={inputCssStyles}
                        required
                    />
                    {/* Stock Minimum */}
                    <label htmlFor="stockMinimum" className={labelCssStyles}>
                        Stock Minimum
                    </label>
                    <input 
                        type="number" 
                        name="stockMinimum" 
                        placeholder="stockMinimum" 
                        onChange={handleChange}
                        value={formData.stockMinimum}
                        className={inputCssStyles}
                        required
                    />
                    {/* Rating */}
                    <label htmlFor="rating" className={labelCssStyles}>
                        Rating
                    </label>
                    <input 
                        type="number" 
                        name="rating" 
                        placeholder="rating" 
                        onChange={handleChange}
                        value={formData.rating}
                        className={inputCssStyles}
                        required
                    />

                    {/* Submit */}
                    <button type="submit" className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700">
                        Create
                    </button>

                    {/* Cancel */}
                    <button type="button" className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProductModal