import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { v4 } from "uuid";
import Header from "@/app/(components)/Header";

type ExpenseByCategoryFormData = {
    expenseByCategoryId: string;
    name: string;
    description: string;
}

type CreateExpenseByCategoryModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (formData: ExpenseByCategoryFormData) => void;
};

const CreateExpenseByCategoryModal = ({
    isOpen,
    onClose,
    onCreate,
}: CreateExpenseByCategoryModalProps) => {
    const [formData, setFormData] = useState<ExpenseByCategoryFormData>({
        expenseByCategoryId: v4(),
        name: "",
        description: "",
    });

    useEffect(() => {
        if (isOpen) {
            setFormData({
                expenseByCategoryId: v4(),
                name: "",
                description: "",
            });
        }
    }, [isOpen]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onCreate(formData);
        onClose();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    };

    if (!isOpen) return null;

    const labelStyles = "block text-sm font-medium text-gray-700 mb-1";
    const inputStyles = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white";

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <Header name="Create New ExpenseByCategory" />
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    {/* Category Name */}
                    <label htmlFor="categoryName" className={labelStyles}>
                        Category Name
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Category Name" 
                        onChange={handleChange}
                        value={formData.name}
                        className={inputStyles}
                        required
                    />

                    {/* Category Description */}
                    <label htmlFor="categoryDescription" className={labelStyles}>
                        Description
                    </label>
                    <input 
                        type="text" 
                        name="description" 
                        placeholder="Description" 
                        onChange={handleChange}
                        value={formData.description}
                        className={inputStyles}
                        required
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
                            Create Expense Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateExpenseByCategoryModal;