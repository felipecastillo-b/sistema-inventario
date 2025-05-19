"use client"

import { useCreateClientMutation, useGetClientsQuery, useUpdateClientMutation } from "@/state/api";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react"
import Header from "../(components)/Header";
import CreateClientModal from "./CreateClientModal";
import UpdateClientModal from "./UpdateClientModal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ProtectedRoute from "../(components)/ProtectedRoute";

type ClientFormData = {
    clientId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
};

const Clients = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: client, isLoading, isError } = useGetClientsQuery();
    const [createClient] = useCreateClientMutation();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<ClientFormData | null>(null);
    const [updateClient] = useUpdateClientMutation();

    const handleCreateClient = async (clientData: ClientFormData) => {
        await createClient(clientData);
    }

    const handleUpdateClient = async (data: ClientFormData) => {
        await updateClient(data);
    };

    const columns: GridColDef[] = [
        { field: "clientId", headerName: "ID", width: 90, sortable: true },
        { field: "name", headerName: "Client Name", width: 200 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "phone", headerName: "Phone", width: 200 },
        { field: "address", headerName: "Address", width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                    onClick={() => {
                        setSelectedClient(params.row);
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

    if (isError || !client) {
        return (
            <ProtectedRoute>
                <div className="text-center text-red-500 py-4">
                    Failed to fetch Client
                </div>
            </ProtectedRoute>
        );
    };

    return (
        <ProtectedRoute>
            <div className="mx-auto pb-5 w-full">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <Header name="Client"/>
                    <button 
                        className="flex items-center bg-purple-500 hover:bg-purple-700 text-gray-200 font-bold py-2 px-4 rounded" 
                        onClick={() => setIsModalOpen(true)}
                    >
                        <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200"/>
                        Create Client
                    </button>
                </div>

                {/* Client List */}
                <div className="flex flex-col">
                        <DataGrid 
                            rows={client} 
                            columns={columns} 
                            getRowId={(row) => row.clientId} 
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
                <CreateClientModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onCreate={handleCreateClient}
                />

                <UpdateClientModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                    onUpdate={handleUpdateClient}
                    initialData={selectedClient}
                />
            </div>
        </ProtectedRoute>
    )
};

export default Clients