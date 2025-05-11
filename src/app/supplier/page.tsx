"use client"

import { useCreateSupplierMutation, useGetSupplierQuery, useUpdateSupplierMutation } from "@/state/api";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react"
import Header from "../(components)/Header";
import CreateSupplierModal from "./CreateSupplierModal";
import UpdateSupplierModal from "./UpdateSupplierModal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ProtectedRoute from "../(components)/ProtectedRoute";

type SupplierFormData = {
    supplierId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
};

const Supplier = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: supplier, isLoading, isError } = useGetSupplierQuery();
    const [createSupplier] = useCreateSupplierMutation();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<SupplierFormData | null>(null);
    const [updateSupplier] = useUpdateSupplierMutation();

    const handleCreateSupplier = async (supplierData: SupplierFormData) => {
        await createSupplier(supplierData);
    }

    const handleUpdateSupplier = async (data: SupplierFormData) => {
        await updateSupplier(data);
    };

    const columns: GridColDef[] = [
        { field: "supplierId", headerName: "ID", width: 90, sortable: true },
        { field: "name", headerName: "Supplier Name", width: 200 },
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
                        setSelectedSupplier(params.row);
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

    if (isError || !supplier) {
        return (
            <div className="text-center text-red-500 py-4">
                Failed to fetch Supplier
            </div>
        );
    };

    return (
        <ProtectedRoute>
            <div className="mx-auto pb-5 w-full">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <Header name="Supplier"/>
                    <button 
                        className="flex items-center bg-purple-500 hover:bg-purple-700 text-gray-200 font-bold py-2 px-4 rounded" 
                        onClick={() => setIsModalOpen(true)}
                    >
                        <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200"/>
                        Create Supplier
                    </button>
                </div>

                {/* Supplier List */}
                <div className="flex flex-col">
                        <DataGrid 
                            rows={supplier} 
                            columns={columns} 
                            getRowId={(row) => row.supplierId} 
                            checkboxSelection
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'supplierId', sort: 'asc' }],
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
                <CreateSupplierModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onCreate={handleCreateSupplier}
                />

                <UpdateSupplierModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                    onUpdate={handleUpdateSupplier}
                    initialData={selectedSupplier}
                />
            </div>
        </ProtectedRoute>
    )
};

export default Supplier