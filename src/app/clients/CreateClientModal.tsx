import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { v4 } from "uuid";
import Header from "../(components)/Header";

type ClientFormData = {
    clientId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
};

type CreateClientModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: ( formData: ClientFormData ) => void;
};

const CreateClientModal = ({
    isOpen,
    onClose,
    onCreate,
}: CreateClientModalProps) => {
    const [formData, setFormData] = useState({
        clientId: v4(),
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
                clientId: v4(),
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
                <Header name="Create New Client"/>
                <form onSubmit={handleSubmit} className="mt-5">
                    {/* Client Name */}
                    <label htmlFor="clientName" className={labelCssStyles}>
                        Client Name
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Client Name" 
                        onChange={handleChange}
                        value={formData.name}
                        className={inputCssStyles}
                        required
                    />
                    {/* Client Email */}
                    <label htmlFor="clientEmail" className={labelCssStyles}>
                        Email
                    </label>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="email" 
                        onChange={handleChange}
                        value={formData.email}
                        className={inputCssStyles}
                        required
                    />
                    {/* Client Phone */}
                    <label htmlFor="clientPhone" className={labelCssStyles}>
                        Phone
                    </label>
                    <input 
                        type="text" 
                        name="phone" 
                        placeholder="phone" 
                        onChange={handleChange}
                        value={formData.phone}
                        className={inputCssStyles}
                        required
                    />
                    {/* Client Address */}
                    <label htmlFor="clientAddress" className={labelCssStyles}>
                        Address
                    </label>
                    <input 
                        type="text" 
                        name="address" 
                        placeholder="address" 
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

export default CreateClientModal