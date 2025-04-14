import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Header from "../(components)/Header";

type RoleFormData = {
    roleId: number;
    name: string;
    description: string;
};

type CreateRoleModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: ( formData: RoleFormData ) => void;
};

const CreateRoleModal = ({
    isOpen,
    onClose,
    onCreate,
}: CreateRoleModalProps) => {
    const [formData, setFormData] = useState({
        roleId: 0,
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
            name === "roleId" ? Number(value) : value
        })
    };

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                roleId: 0,
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
                <Header name="Create New Role"/>
                <form onSubmit={handleSubmit} className="mt-5">
                    {/* Role Name */}
                    <label htmlFor="roleName" className={labelCssStyles}>
                        Role Name
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Role Name" 
                        onChange={handleChange}
                        value={formData.name}
                        className={inputCssStyles}
                        required
                    />
                    {/* Role Description */}
                    <label htmlFor="roleDescription" className={labelCssStyles}>
                        Description
                    </label>
                    <input 
                        type="text" 
                        name="description" 
                        placeholder="Description" 
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

export default CreateRoleModal