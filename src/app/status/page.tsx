"use client"

import { useCreateStatusMutation, useGetStatusQuery, useUpdateStatusMutation } from "@/state/api";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react"
import Header from "../(components)/Header";
import CreateStatusModal from "./CreateStatusModal";
import UpdateStatusModal from "./UpdateStatusModal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ProtectedRoute from "../(components)/ProtectedRoute";
import Unauthorized from "../(components)/Unauthorized";
import { useUserRole } from "@/hooks/useUserRole";

type StatusFormData = {
    statusId: number;
    name: string;
    description: string;
};

const Status = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: status, isLoading, isError } = useGetStatusQuery();
    const [createStatus] = useCreateStatusMutation();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<StatusFormData | null>(null);
    const [updateStatus] = useUpdateStatusMutation();
    const roleId = useUserRole();

    const handleCreateStatus = async (statusData: StatusFormData) => {
        await createStatus(statusData);
    }

    const handleUpdateStatus = async (data: StatusFormData) => {
        await updateStatus(data);
    };

    const columns: GridColDef[] = [
        { field: "statusId", headerName: "ID", width: 90, sortable: true },
        { field: "name", headerName: "Status Name", width: 200 },
        { field: "description", headerName: "Status Description", width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                    onClick={() => {
                        setSelectedStatus(params.row);
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

    if (isError || !status) {
        return (
            <ProtectedRoute>
                <div className="text-center text-red-500 py-4">
                    Failed to fetch Status
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
                    <Header name="Status"/>
                    <button 
                        className="flex items-center bg-purple-500 hover:bg-purple-700 text-gray-200 font-bold py-2 px-4 rounded" 
                        onClick={() => setIsModalOpen(true)}
                    >
                        <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200"/>
                        Create Status
                    </button>
                </div>

                {/* Status List */}
                <div className="flex flex-col">
                        <Header name="Status"/>
                        <DataGrid 
                            rows={status} 
                            columns={columns} 
                            getRowId={(row) => row.statusId} 
                            checkboxSelection
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'statusId', sort: 'asc' }],
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
                <CreateStatusModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onCreate={handleCreateStatus}
                />

                <UpdateStatusModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                    onUpdate={handleUpdateStatus}
                    initialData={selectedStatus}
                />
            </div>
        </ProtectedRoute>
    )
};

export default Status