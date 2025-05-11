import { ChangeEvent, FormEvent, useState, useEffect } from "react";
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

type UpdateUserModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (formData: UserFormData) => void;
    initialData: UserFormData | null;
};

const UpdateUserModal = ({ isOpen, onClose, onUpdate, initialData }: UpdateUserModalProps) => {
    const { data: role } = useGetRoleQuery();
    const { data: status } = useGetStatusQuery();
    const [formData, setFormData] = useState<UserFormData>({
        userId: "",
        name: "",
        email: "",
        password: "",
        roleId: 0,
        statusId: 0,
    });

    useEffect(() => {
        if (initialData) setFormData(initialData);
    }, [initialData]);

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
                <Header name="Update User" />
                <form onSubmit={handleSubmit} className="mt-5">
                    <label htmlFor="userName" className={labelStyles}>User Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputStyles}
                        required
                    />

                    <label htmlFor="userEmail" className={labelStyles}>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputStyles}
                        required
                    />

                    <label htmlFor="userPassword" className={labelStyles}>Password</label>
                    <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={inputStyles}
                        required
                    />

                    <label htmlFor="userRoleId" className={labelStyles}>
                        Role
                    </label>
                    <select
                        name="roleId"
                        onChange={handleSelectChange}
                        value={formData.roleId}
                        className={inputStyles}
                        required
                    >
                        {role?.map((role) => (
                            <option key={role.roleId} value={role.roleId}>
                                {role.name}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="userStatusId" className={labelStyles}>
                        Status
                    </label>
                    <select
                        name="statusId"
                        onChange={handleSelectChange}
                        value={formData.statusId}
                        className={inputStyles}
                        required
                    >
                        {status?.filter((status) => status.statusId >= 0 && status.statusId <= 99)
                            .map((status) => (
                                <option key={status.statusId} value={status.statusId}>
                                    {status.name}
                                </option>
                        ))}
                    </select>

                    <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Update</button>
                    <button type="button" className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserModal;
