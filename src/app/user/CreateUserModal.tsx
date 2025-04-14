import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { v4 } from "uuid";
import Header from "../(components)/Header";
import { useGetRoleQuery, useGetStatusQuery } from "@/state/api";

type UserFormData = {
    userId: string;
    name: string;
    email: string;
    password: string;
    roleId: number;
    statusId: number;
};

type CreateUserModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: ( formData: UserFormData ) => void;
};

const CreateUserModal = ({
    isOpen,
    onClose,
    onCreate,
}: CreateUserModalProps) => {
    const { data: role } = useGetRoleQuery();
    const { data: status } = useGetStatusQuery();
    const [formData, setFormData] = useState({
        userId: v4(),
        name: "",
        email: "",
        password: "",
        roleId: 0,
        statusId: 0,
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
            name === "roleId" || name === "statusId" ? Number(value) : value
        })
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: Number(value),
        });
    };

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                userId: v4(),
                name: "",
                email: "",
                password: "",
                roleId: 0,
                statusId: 0,
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const labelCssStyles = "block text-sm font-medium text-gray-700";
    const inputCssStyles = "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md text-white";

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <Header name="Create New User"/>
                <form onSubmit={handleSubmit} className="mt-5">
                    {/* User Name */}
                    <label htmlFor="userName" className={labelCssStyles}>
                        User Name
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="User Name" 
                        onChange={handleChange}
                        value={formData.name}
                        className={inputCssStyles}
                        required
                    />
                    {/* User Email */}
                    <label htmlFor="userEmail" className={labelCssStyles}>
                        Email
                    </label>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="Email" 
                        onChange={handleChange}
                        value={formData.email}
                        className={inputCssStyles}
                        required
                    />
                    {/* User Password */}
                    <label htmlFor="userPassword" className={labelCssStyles}>
                        Password
                    </label>
                    <input 
                        type="text" 
                        name="password" 
                        placeholder="Password" 
                        onChange={handleChange}
                        value={formData.password}
                        className={inputCssStyles}
                        required
                    />
                    {/* User Role */}
                    <label htmlFor="userRoleId" className={labelCssStyles}>
                        Role
                    </label>
                    <select
                        name="roleId"
                        onChange={handleSelectChange}
                        value={formData.roleId}
                        className={inputCssStyles}
                        required
                    >
                        {role?.map((role) => (
                            <option key={role.roleId} value={role.roleId}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                    {/* User Status */}
                    <label htmlFor="userStatusId" className={labelCssStyles}>
                        Status
                    </label>
                    <select
                        name="statusId"
                        onChange={handleSelectChange}
                        value={formData.statusId}
                        className={inputCssStyles}
                        required
                    >
                        {status?.filter((status) => status.statusId >= 0 && status.statusId <= 99)
                            .map((status) => (
                                <option key={status.statusId} value={status.statusId}>
                                    {status.name}
                                </option>
                        ))}
                    </select>

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

export default CreateUserModal