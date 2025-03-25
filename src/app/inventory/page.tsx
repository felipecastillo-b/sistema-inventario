"use client";

import { useGetProductsQuery } from "@/state/api";
import Header from "../(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: "productId", headerName: "ID", width: 90 },
    { field: "image_url", headerName: "Photo", width: 50 },
    { field: "name", headerName: "Product Name", width: 200 },
    { field: "price", headerName: "Price", width: 110, type: "number", valueGetter: (value, row) => `$${row.price}`, },
    { field: "rating", headerName: "Rating", width: 110, type: "number", valueGetter: (value, row) => row.rating ? row.rating : "N/A", },
    { field: "stockQuantity", headerName: "Stock Quantity", width: 150, },
    { field: "stockMinimum", headerName: "Stock Minimum", width: 150, },
];

const Inventory = () => {
    const { data: products, isError, isLoading } = useGetProductsQuery();

    if (isLoading) {
        return (
            <div className="py-4">
                Loading...
            </div>
        )
    }

    if (isError || !products) {
        return (
            <div className="text-center text-red-500 py-4">
                Failed to fetch Products
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <Header name="Inventory"/>
            <DataGrid 
                rows={products} 
                columns={columns} 
                getRowId={(row) => row.productId} 
                checkboxSelection
                className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700 
                [&_.MuiTablePagination-root]:!text-gray-700
                [&_.MuiButtonBase-root]:!text-gray-700
                [&_.MuiDataGrid-columnHeader]:bg-white
                [&_.MuiDataGrid-filler]:bg-white
                [&_.MuiSvgIcon-root]:!text-gray-700
                "
            />
        </div>
    );
};

export default Inventory