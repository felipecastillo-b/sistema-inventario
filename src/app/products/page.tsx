/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useCreateProductMutation, useGetProductsQuery, useUpdateProductMutation } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "../(components)/Header";
import CreateProductModal from "./CreateProductModal";
import UpdateProductModal from "./UpdateProductModal";
import Rating from "../(components)/Rating";
import ProtectedRoute from "../(components)/ProtectedRoute";

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
};

const Product = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductFormData | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const { data: products, isLoading, isError } = useGetProductsQuery();
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    const handleCreateProduct = async (productData: ProductFormData) => {
        await createProduct(productData);
    };

    const handleUpdateProduct = async (data: ProductFormData) => {
        await updateProduct(data);
    };

    const filteredProducts = products?.filter((product: any) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedProducts = filteredProducts?.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
    );

    if (isLoading) return <div className="py-4">Loading...</div>;

    if (isError || !products) {
        return (
            <ProtectedRoute>
                <div className="text-center text-red-500 py-4">
                    Failed to fetch Products
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="mx-auto pb-5 w-full">
                {/* Search Bar */}
                <div className="mb-6">
                    <div className="flex items-center border-2 border-gray-200 rounded">
                        <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
                        <input
                            className="w-full py-2 px-4 rounded bg-white"
                            placeholder="Search Products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <Header name="Products" />
                    <button
                        className="flex items-center bg-purple-500 hover:bg-purple-700 text-gray-200 font-bold py-2 px-4 rounded"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" />
                        Create Product
                    </button>
                </div>

                {/* Product Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map((product: any) => (
                        <div key={product.productId} className="border shadow rounded-md p-4 bg-white">
                            <div className="flex flex-col space-y-2">
                                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                <p className="text-sm text-gray-600">Category: {product.category?.name ?? "N/A"}</p>
                                <p className="text-sm text-gray-600">Supplier: {product.supplier?.name ?? "N/A"}</p>
                                <p className="text-sm text-gray-600">Status: {product.status?.name ?? "N/A"}</p>
                                <p className="text-sm text-gray-800 font-medium">Price: ${product.price.toFixed(2)}</p>
                                <p className="text-sm text-gray-600">Stock: {product.stockQuantity}</p>
                                <p className="text-sm text-gray-600">Minimum Stock: {product.stockMinimum}</p>
                                {product.rating && (
                                    <div className="mt-2">
                                        <Rating rating={product.rating} />
                                    </div>
                                )}
                                <button
                                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setIsUpdateModalOpen(true);
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modals */}
                <CreateProductModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCreate={handleCreateProduct}
                />

                <UpdateProductModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                    onUpdate={handleUpdateProduct}
                    initialData={selectedProduct}
                />
            </div>
        </ProtectedRoute>
    );
};

export default Product;
