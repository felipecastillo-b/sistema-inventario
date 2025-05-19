"use client"

import { useCreateUserMutation, useGetUserQuery, useUpdateUserMutation } from "@/state/api";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react"
import Header from "../(components)/Header";
import CreateUserModal from "./CreateUserModal";
import UpdateUserModal from "./UpdateUserModal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ProtectedRoute from "../(components)/ProtectedRoute";
import Unauthorized from "../(components)/Unauthorized";
import { useUserRole } from "@/hooks/useUserRole";

type UserFormData = {
    userId: string;
    name: string;
    email: string;
    password: string;
    roleId: number;
    statusId: number;
};

const Users = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: user, isLoading, isError } = useGetUserQuery();
    const [createUser] = useCreateUserMutation();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserFormData | null>(null);
    const [updateUser] = useUpdateUserMutation();
    const roleId = useUserRole();

    const handleCreateUser = async (userData: UserFormData) => {
        await createUser(userData);
    }

    const handleUpdateUser = async (data: UserFormData) => {
        await updateUser(data);
    };

    const columns: GridColDef[] = [
        { field: "userId", headerName: "ID", width: 90, sortable: true },
        { field: "name", headerName: "User Name", width: 200 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "password", headerName: "Password", width: 200 },
        { field: "roleId", headerName: "Role", width: 200 },
        { field: "statusId", headerName: "Status", width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                    onClick={() => {
                        setSelectedUser(params.row);
                        setIsUpdateModalOpen(true);
                    }}
                >
                    Edit
                </button>
            )
        },
    ];

    if (isLoading) {
        return <div className="py-4">Loading...</div>
    };

    if (isError || !user) {
        return (
            <ProtectedRoute>
                <div className="text-center text-red-500 py-4">
                    Failed to fetch User
                </div>
            </ProtectedRoute>
        );
    };

    if (roleId === null) return <div className="py-4">Cargando...</div>;
    if (roleId !== 1) return <Unauthorized />;

    return (
        <ProtectedRoute>
            <div className="mx-auto pb-5 w-full">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <Header name="User"/>
                    <button 
                        className="flex items-center bg-purple-500 hover:bg-purple-700 text-gray-200 font-bold py-2 px-4 rounded" 
                        onClick={() => setIsModalOpen(true)}
                    >
                        <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200"/>
                        Create User
                    </button>
                </div>

                {/* User List */}
                <div className="flex flex-col">
                        <DataGrid 
                            rows={user} 
                            columns={columns} 
                            getRowId={(row) => row.userId} 
                            checkboxSelection
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'name', sort: 'asc' }],
                                }
                            }}
                            className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700 
                            [&_.MuiTablePagination-root]:!text-gray-700
                            [&_.MuiButtonBase-root]:!text-gray-700
                            [&_.MuiDataGrid-columnHeader]:bg-white
                            [&_.MuiDataGrid-filler]:bg-white
                            [&_.MuiSvgIcon-root]:!text-gray-700
                            "
                        />
                </div>

                {/* Modal */}
                <CreateUserModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onCreate={handleCreateUser}
                />

                <UpdateUserModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                    onUpdate={handleUpdateUser}
                    initialData={selectedUser}
                />
            </div>
        </ProtectedRoute>
    )
};

export default Users