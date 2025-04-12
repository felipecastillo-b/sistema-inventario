import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Header from "../(components)/Header";

type StatusFormData = {
    statusId: number;
    name: string;
    description: string;
};

type CreateStatusModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: ( formData: StatusFormData ) => void;
};

const CreateStatusModal = ({
    isOpen,
    onClose,
    onCreate,
}: CreateStatusModalProps) => {
    const [formData, setFormData] = useState({
        statusId: 0,
        name: "",
        description: "",
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
                name === "statusId" ? Number(value) : value
        })
    };

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                statusId: 0,
                name: "",
                description: "",
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const labelCssStyles = "block text-sm font-medium text-gray-700";
    const inputCssStyles = "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md text-white";

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <Header name="Create New Status"/>
                <form onSubmit={handleSubmit} className="mt-5">
                    {/* Status ID */}
                    <label htmlFor="statusId" className={labelCssStyles}>
                        Status Id
                    </label>
                    <input 
                        type="textnumber" 
                        name="statusId" 
                        placeholder="Status Id" 
                        onChange={handleChange}
                        value={formData.statusId}
                        className={inputCssStyles}
                        required
                    />
                    {/* Name */}
                    <label htmlFor="name" className={labelCssStyles}>
                        Status Name
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        onChange={handleChange}
                        value={formData.name}
                        className={inputCssStyles}
                        required
                    />
                    {/* Description */}
                    <label htmlFor="description" className={labelCssStyles}>
                        Status Description
                    </label>
                    <input 
                        type="text" 
                        name="description" 
                        placeholder="description" 
                        onChange={handleChange}
                        value={formData.description}
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

export default CreateStatusModal