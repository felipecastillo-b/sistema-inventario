import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { v4 } from "uuid";
import Header from "@/app/(components)/Header";
import { useGetExpenseByCategoryQuery } from "@/state/api";

type ExpenseFormData = {
    expenseId: string;
    expenseByCategoryId: string;
    description: string;
    amount: number;
};

type CreateExpenseModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (formData: ExpenseFormData) => void;
};

const CreateExpenseModal = ({
    isOpen,
    onClose,
    onCreate,
}: CreateExpenseModalProps) => {
    const { data: expenseByCategories = [] } = useGetExpenseByCategoryQuery();

    const [formData, setFormData] = useState<ExpenseFormData>({
        expenseId: v4(),
        expenseByCategoryId: "",
        description: "",
        amount: 0,
    });

    // Establecer valores iniciales cuando el modal se abre
    useEffect(() => {
        if (isOpen && expenseByCategories.length) {
            const defaultCategory = expenseByCategories[0];
            setFormData({
                expenseId: v4(),
                expenseByCategoryId: defaultCategory.expenseByCategoryId,
                description: "",
                amount: 0,
            });
        }
    }, [isOpen, expenseByCategories]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const selectedCategory = expenseByCategories.find(p => p.expenseByCategoryId === formData.expenseByCategoryId);
        if (!selectedCategory) return alert("Invalid expenseByCategory selected");

        if (formData.amount <= 0) {
            return alert("All values must be greater than zero");
        }

        onCreate(formData);
        onClose();
    };

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0;
        setFormData(prev => ({
            ...prev,
            amount: value
        }));
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    };


    const labelStyles = "block text-sm font-medium text-gray-700 mb-1";
    const inputStyles = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white";

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <Header name="Create New Expense" />
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    {/* Expense Category */}
                    <div>
                        <label htmlFor="expenseByCategoryId" className={labelStyles}>Expense Category</label>
                        <select
                            id="expenseByCategoryId"
                            name="expenseByCategoryId"
                            onChange={handleSelectChange}
                            value={formData.expenseByCategoryId}
                            className={inputStyles}
                            required
                        >
                            {expenseByCategories.map((expenseByCategory) => (
                                <option key={expenseByCategory.expenseByCategoryId} value={expenseByCategory.expenseByCategoryId}>
                                    {expenseByCategory.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="expenseDescription" className={labelStyles}>Description</label>
                        <input 
                            type="text" 
                            name="description" 
                            placeholder="Description" 
                            onChange={handleChange}
                            value={formData.description}
                            className={inputStyles}
                            required
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label htmlFor="amount" className={labelStyles}>Amount ($)</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            onChange={handleAmountChange}
                            value={formData.amount}
                            className={`${inputStyles} bg-gray-100`}
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
                            Create Expense
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateExpenseModal;
