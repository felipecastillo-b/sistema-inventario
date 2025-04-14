"use client"

import { useCreateCategoryMutation, useGetCategoryQuery, useUpdateCategoryMutation } from "@/state/api";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react"
import Header from "../(components)/Header";
import CreateCategoryModal from "./CreateCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type CategoryFormData = {
    categoryId: string;
    name: string;
    description: string;
};

const Category = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: category, isLoading, isError } = useGetCategoryQuery();
    const [createCategory] = useCreateCategoryMutation();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryFormData | null>(null);
    const [updateCategory] = useUpdateCategoryMutation();

    const handleCreateCategory = async (categoryData: CategoryFormData) => {
        await createCategory(categoryData);
    }

    const handleUpdateCategory = async (data: CategoryFormData) => {
        await updateCategory(data);
    };

    const columns: GridColDef[] = [
        { field: "categoryId", headerName: "ID", width: 90, sortable: true },
        { field: "name", headerName: "Category Name", width: 200 },
        { field: "description", headerName: "Description", width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                    onClick={() => {
                        setSelectedCategory(params.row);
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

    if (isError || !category) {
        return (
            <div className="text-center text-red-500 py-4">
                Failed to fetch Category
            </div>
        );
    };

    return (
        <div className="mx-auto pb-5 w-full">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <Header name="Category"/>
                <button 
                    className="flex items-center bg-purple-500 hover:bg-purple-700 text-gray-200 font-bold py-2 px-4 rounded" 
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200"/>
                    Create Category
                </button>
            </div>

            {/* Category List */}
            <div className="flex flex-col">
                    <DataGrid 
                        rows={category} 
                        columns={columns} 
                        getRowId={(row) => row.categoryId} 
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
            <CreateCategoryModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onCreate={handleCreateCategory}
            />

            <UpdateCategoryModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                onUpdate={handleUpdateCategory}
                initialData={selectedCategory}
            />
        </div>
    )
};

export default Category