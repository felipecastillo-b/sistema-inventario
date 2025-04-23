import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { v4 } from "uuid";
import Header from "@/app/(components)/Header";
import { useGetProductsQuery, useGetClientsQuery } from "@/state/api";

type SaleFormData = {
    saleId: string;
    productId: string;
    clientId: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
};

type CreateSaleModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (formData: SaleFormData) => void;
};

const CreateSaleModal = ({
    isOpen,
    onClose,
    onCreate,
}: CreateSaleModalProps) => {
    const { data: products = [] } = useGetProductsQuery();
    const { data: clients = [] } = useGetClientsQuery();

    const [formData, setFormData] = useState<SaleFormData>({
        saleId: v4(),
        productId: "",
        clientId: "",
        quantity: 0,
        unitPrice: 0,
        totalAmount: 0,
    });

    // Establecer valores iniciales cuando el modal se abre
    useEffect(() => {
        if (isOpen && products.length && clients.length) {
            const defaultProduct = products[0];
            setFormData({
                saleId: v4(),
                productId: defaultProduct.productId,
                clientId: clients[0].clientId,
                quantity: 0,
                unitPrice: defaultProduct.price,
                totalAmount: 0,
            });
        }
    }, [isOpen, products, clients]);

    // Recalcular unitPrice y totalAmount cuando cambie el producto
    useEffect(() => {
        const selectedProduct = products.find(p => p.productId === formData.productId);
        if (selectedProduct) {
            setFormData(prev => ({
                ...prev,
                unitPrice: selectedProduct.price,
                totalAmount: parseFloat((prev.quantity * selectedProduct.price).toFixed(2))
            }));
        }
    }, [formData.productId]);

    // Recalcular totalAmount cuando cambie quantity
    useEffect(() => {
        const selectedProduct = products.find(p => p.productId === formData.productId);
        if (selectedProduct) {
            const newTotal = formData.quantity * selectedProduct.price;
            setFormData(prev => ({
                ...prev,
                totalAmount: parseFloat(newTotal.toFixed(2))
            }));
        }
    }, [formData.quantity]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const selectedProduct = products.find(p => p.productId === formData.productId);
        if (!selectedProduct) return alert("Invalid product selected");
        if (formData.quantity > selectedProduct.stockQuantity) {
            return alert("Quantity exceeds available stock");
        }

        if (formData.quantity <= 0 || formData.unitPrice <= 0 || formData.totalAmount <= 0) {
            return alert("All values must be greater than zero");
        }

        onCreate(formData);
        onClose();
    };

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setFormData(prev => ({
            ...prev,
            quantity: value
        }));
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const selectedProduct = products.find(p => p.productId === formData.productId);
    const maxStock = selectedProduct?.stockQuantity || 0;

    const labelStyles = "block text-sm font-medium text-gray-700 mb-1";
    const inputStyles = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white";

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <Header name="Create New Sale" />
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    {/* Product */}
                    <div>
                        <label htmlFor="productId" className={labelStyles}>Product</label>
                        <select
                            id="productId"
                            name="productId"
                            onChange={handleSelectChange}
                            value={formData.productId}
                            className={inputStyles}
                            required
                        >
                            {products.map((product) => (
                                <option key={product.productId} value={product.productId}>
                                    {product.name} - ${product.price} | stock: {product.stockQuantity}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Client */}
                    <div>
                        <label htmlFor="clientId" className={labelStyles}>Client</label>
                        <select
                            id="clientId"
                            name="clientId"
                            onChange={handleSelectChange}
                            value={formData.clientId}
                            className={inputStyles}
                            required
                        >
                            {clients.map((client) => (
                                <option key={client.clientId} value={client.clientId}>
                                    {client.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Quantity */}
                    <div>
                        <label htmlFor="quantity" className={labelStyles}>Quantity (max {maxStock})</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min={1}
                            max={maxStock}
                            step={1}
                            value={formData.quantity}
                            onChange={handleQuantityChange}
                            className={inputStyles}
                            required
                        />
                    </div>

                    {/* Unit Price */}
                    <div>
                        <label htmlFor="unitPrice" className={labelStyles}>Unit Price ($)</label>
                        <input
                            type="number"
                            id="unitPrice"
                            name="unitPrice"
                            value={formData.unitPrice}
                            readOnly
                            className={`${inputStyles} bg-gray-100 cursor-not-allowed`}
                        />
                    </div>

                    {/* Total Amount */}
                    <div>
                        <label htmlFor="totalAmount" className={labelStyles}>Total Amount ($)</label>
                        <input
                            type="number"
                            id="totalAmount"
                            name="totalAmount"
                            value={formData.totalAmount}
                            readOnly
                            className={`${inputStyles} bg-gray-100 cursor-not-allowed`}
                        />
                    </div>

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
                            Create Sale
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSaleModal;
