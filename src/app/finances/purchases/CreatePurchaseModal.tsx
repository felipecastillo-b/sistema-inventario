import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { v4 } from "uuid";
import Header from "@/app/(components)/Header";
import { useGetProductsQuery } from "@/state/api";

type PurchaseFormData = {
    purchaseId: string;
    productId: string;
    quantity: number;
    unitCost: number;
    totalCost: number;
};

type CreatePurchaseModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (formData: PurchaseFormData) => void;
};

const CreatePurchaseModal = ({
    isOpen,
    onClose,
    onCreate,
}: CreatePurchaseModalProps) => {
    const { data: products = [] } = useGetProductsQuery();
    const [lastEditedField, setLastEditedField] = useState<'quantity' | 'unitCost' | 'totalCost' | null>(null);
    
    const [formData, setFormData] = useState<PurchaseFormData>({
        purchaseId: v4(),
        productId: products[0]?.productId || "",
        quantity: 0,
        unitCost: 0,
        totalCost: 0,
    });

    useEffect(() => {
        if (isOpen) {
            setFormData({
                purchaseId: v4(),
                productId: products[0]?.productId || "",
                quantity: 0,
                unitCost: 0,
                totalCost: 0,
            });
            setLastEditedField(null);
        }
    }, [isOpen, products]);

    // Efecto para calcular valores automáticamente
    useEffect(() => {
        if (lastEditedField === 'quantity' || lastEditedField === 'unitCost') {
            // Calcular totalCost cuando se edita quantity o unitCost
            const newTotalCost = formData.quantity * formData.unitCost;
            setFormData(prev => ({
                ...prev,
                totalCost: parseFloat(newTotalCost.toFixed(2))
            }));
        } else if (lastEditedField === 'totalCost' && formData.quantity > 0) {
            // Calcular unitCost cuando se edita totalCost y hay quantity
            const newUnitCost = formData.totalCost / formData.quantity;
            setFormData(prev => ({
                ...prev,
                unitCost: parseFloat(newUnitCost.toFixed(2))
            }));
        }
    }, [formData.quantity, formData.unitCost, formData.totalCost, lastEditedField]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!formData.productId) {
            alert('Please select a product');
            return;
        }

        if (formData.quantity <= 0 || formData.unitCost <= 0 || formData.totalCost <= 0) {
            alert('All values must be greater than zero');
            return;
        }

        onCreate(formData);
        onClose();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numericValue = parseFloat(value) || 0;
        
        setLastEditedField(name as 'quantity' | 'unitCost' | 'totalCost');
        
        setFormData(prev => ({
            ...prev,
            [name]: numericValue
        }));
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!isOpen) return null;

    const labelStyles = "block text-sm font-medium text-gray-700 mb-1";
    const inputStyles = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white";

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <Header name="Create New Purchase" />
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    {/* Purchase Product */}
                    <div>
                        <label htmlFor="productId" className={labelStyles}>
                            Product
                        </label>
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
                                    {product.name} - ${product.price}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Purchase Quantity */}
                    <div>
                        <label htmlFor="quantity" className={labelStyles}>
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            placeholder="0"
                            min="1"
                            step="1"
                            onChange={handleChange}
                            value={formData.quantity || ''}
                            className={inputStyles}
                            required
                        />
                    </div>

                    {/* Purchase unitCost */}
                    <div>
                        <label htmlFor="unitCost" className={labelStyles}>
                            Unit Cost ($)
                        </label>
                        <input
                            type="number"
                            id="unitCost"
                            name="unitCost"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            onChange={handleChange}
                            value={formData.unitCost || ''}
                            className={inputStyles}
                            required
                        />
                    </div>

                    {/* Purchase totalCost */}
                    <div>
                        <label htmlFor="totalCost" className={labelStyles}>
                            Total Cost ($)
                        </label>
                        <input
                            type="number"
                            id="totalCost"
                            name="totalCost"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            onChange={handleChange}
                            value={formData.totalCost || ''}
                            className={inputStyles}
                            required
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
                            Create Purchase
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePurchaseModal;