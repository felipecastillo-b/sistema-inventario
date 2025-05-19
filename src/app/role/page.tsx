"use client"

import { useCreateRoleMutation, useGetRoleQuery, useUpdateRoleMutation } from "@/state/api";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react"
import Header from "../(components)/Header";
import CreateRoleModal from "./CreateRoleModal";
import UpdateRoleModal from "./UpdateRoleModal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ProtectedRoute from "../(components)/ProtectedRoute";
import Unauthorized from "../(components)/Unauthorized";
import { useUserRole } from "@/hooks/useUserRole";

type RoleFormData = {
    roleId: number;
    name: string;
    description: string;
};

const Role = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: role, isLoading, isError } = useGetRoleQuery();
    const [createRole] = useCreateRoleMutation();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<RoleFormData | null>(null);
    const [updateRole] = useUpdateRoleMutation();
    const roleId = useUserRole();

    const handleCreateRole = async (roleData: RoleFormData) => {
        await createRole(roleData);
    }

    const handleUpdateRole = async (data: RoleFormData) => {
        await updateRole(data);
    };

    const columns: GridColDef[] = [
        { field: "roleId", headerName: "ID", width: 90, sortable: true },
        { field: "name", headerName: "Role Name", width: 200 },
        { field: "description", headerName: "Description", width: 1000 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                    onClick={() => {
                        setSelectedRole(params.row);
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

    if (isError || !role) {
        return (
            <ProtectedRoute>
                <div className="text-center text-red-500 py-4">
                    Failed to fetch Role
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
                    <Header name="Role"/>
                    <button 
                        className="flex items-center bg-purple-500 hover:bg-purple-700 text-gray-200 font-bold py-2 px-4 rounded" 
                        onClick={() => setIsModalOpen(true)}
                    >
                        <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200"/>
                        Create Role
                    </button>
                </div>

                {/* Role List */}
                <div className="flex flex-col">
                        <DataGrid 
                            rows={role} 
                            columns={columns} 
                            getRowId={(row) => row.roleId} 
                            checkboxSelection
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'roleId', sort: 'asc' }],
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
                <CreateRoleModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onCreate={handleCreateRole}
                />

                <UpdateRoleModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                    onUpdate={handleUpdateRole}
                    initialData={selectedRole}
                />
            </div>
        </ProtectedRoute>
    )
};

export default Role