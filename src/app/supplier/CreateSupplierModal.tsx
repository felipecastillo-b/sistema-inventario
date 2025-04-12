import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { v4 } from "uuid";
import Header from "../(components)/Header";

type SupplierFormData = {
    supplierId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
};

type CreateSupplierModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: ( formData: SupplierFormData ) => void;
};

const CreateSupplierModal = ({
    isOpen,
    onClose,
    onCreate,
}: CreateSupplierModalProps) => {
    const [formData, setFormData] = useState({
        supplierId: v4(),
        name: "",
        email: "",
        phone: "",
        address: "",
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
            [name]: value,
        })
    };

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                supplierId: v4(),
                name: "",
                email: "",
                phone: "",
                address: "",
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const labelCssStyles = "block text-sm font-medium text-gray-700";
    const inputCssStyles = "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md text-white";

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <Header name="Create New Supplier"/>
                <form onSubmit={handleSubmit} className="mt-5">
                    {/* Supplier Name */}
                    <label htmlFor="supplierName" className={labelCssStyles}>
                        Supplier Name
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Supplier Name" 
                        onChange={handleChange}
                        value={formData.name}
                        className={inputCssStyles}
                        required
                    />
                    {/* Supplier Email */}
                    <label htmlFor="supplierEmail" className={labelCssStyles}>
                        Supplier Email
                    </label>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="Supplier Email" 
                        onChange={handleChange}
                        value={formData.email}
                        className={inputCssStyles}
                        required
                    />
                    {/* Supplier Phone */}
                    <label htmlFor="supplierPhone" className={labelCssStyles}>
                        Supplier Phone
                    </label>
                    <input 
                        type="text" 
                        name="phone" 
                        placeholder="Supplier Phone" 
                        onChange={handleChange}
                        value={formData.phone}
                        className={inputCssStyles}
                        required
                    />
                    {/* Supplier Address */}
                    <label htmlFor="supplierAddress" className={labelCssStyles}>
                        Supplier Address
                    </label>
                    <input 
                        type="text" 
                        name="address" 
                        placeholder="Supplier Address" 
                        onChange={handleChange}
                        value={formData.address}
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

export default CreateSupplierModal