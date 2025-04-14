import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Header from "../(components)/Header";

type CategoryFormData = {
    categoryId: string;
    name: string;
    description: string;
};

type UpdateCategoryModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (formData: CategoryFormData) => void;
    initialData: CategoryFormData | null;
};

const UpdateCategoryModal = ({ isOpen, onClose, onUpdate, initialData }: UpdateCategoryModalProps) => {
    const [formData, setFormData] = useState<CategoryFormData>({
        categoryId: "",
        name: "",
        description: "",
    });

    useEffect(() => {
        if (initialData) setFormData(initialData);
    }, [initialData]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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
                <Header name="Update Category" />
                <form onSubmit={handleSubmit} className="mt-5">
                    <label htmlFor="categoryName" className={labelStyles}>Category Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputStyles}
                        required
                    />

                    <label htmlFor="categoryDescription" className={labelStyles}>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
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

export default UpdateCategoryModal;
