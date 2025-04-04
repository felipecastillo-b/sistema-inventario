"use client";

import { useGetClientsQuery } from "@/state/api";
import Header from "../(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: "clientId", headerName: "ID", width: 90 },
    { field: "name", headerName: "Client Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
];

const Clients = () => {
    const { data: clients, isError, isLoading } = useGetClientsQuery();

    if (isLoading) {
        return (
            <div className="py-4">
                Loading...
            </div>
        )
    }

    if (isError || !clients) {
        return (
            <div className="text-center text-red-500 py-4">
                Failed to fetch Clients
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <Header name="Clients"/>
            <DataGrid 
                rows={clients} 
                columns={columns} 
                getRowId={(row) => row.clientId} 
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

export default Clients;