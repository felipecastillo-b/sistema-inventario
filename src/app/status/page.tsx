"use client"

import { useCreateStatusMutation, useGetStatusQuery, useUpdateStatusMutation } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "../(components)/Header";
import CreateStatusModal from "./CreateStatusModal";
import UpdateStatusModal from "./UpdateStatusModal";
import ProtectedRoute from "../(components)/ProtectedRoute";
import Unauthorized from "../(components)/Unauthorized";
import { useUserRole } from "@/hooks/useUserRole";

type StatusFormData = {
    statusId: number;
    name: string;
    description: string;
};

const ITEMS_PER_PAGE = 15;

const Status = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<StatusFormData | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const { data: statusList, isLoading, isError } = useGetStatusQuery();
    const [createStatus] = useCreateStatusMutation();
    const [updateStatus] = useUpdateStatusMutation();
    const roleId = useUserRole();

    const handleCreateStatus = async (statusData: StatusFormData) => {
        await createStatus(statusData);
    };

    const handleUpdateStatus = async (data: StatusFormData) => {
        await updateStatus(data);
    };

    // Filtro
    const filteredStatus = statusList?.filter((status) =>
        status.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        status.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // Ordenamiento
    const sortedStatus = [...filteredStatus].sort((a, b) => {
        if (a.statusId < b.statusId) return sortDirection === "asc" ? -1 : 1;
        if (a.statusId > b.statusId) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    // Paginacion
    const totalPages = Math.ceil(sortedStatus.length / ITEMS_PER_PAGE);
    const paginatedStatus = sortedStatus.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    if (isLoading) return <div className="py-4">Loading...</div>;

    if (roleId === null) return <ProtectedRoute>Loading...</ProtectedRoute>;
    if (roleId !== 1) return <Unauthorized />;

    if (isError || !statusList) {
        return (
            <ProtectedRoute>
                <div className="text-center text-red-500 py-4">
                    Failed to fetch Status
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="mx-auto pb-5 w-full px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <Header name="Status" />
                    <button
                        className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <PlusCircleIcon className="w-5 h-5 mr-2" />
                        Create Status
                    </button>
                </div>

                {/* Search */}
                <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <SearchIcon className="w-5 h-5 text-gray-500 mr-2" />
                        <input
                            className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                            placeholder="Search by name or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}>
                                        ID {sortDirection === "asc" ? "↑" : "↓"}
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    >
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paginatedStatus.map((status) => (
                                    <tr key={status.statusId} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{status.statusId}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{status.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{status.description}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                                                onClick={() => {
                                                    setSelectedStatus(status);
                                                    setIsUpdateModalOpen(true);
                                                }}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center px-4 py-3 border-t border-gray-200">
                        <p className="text-sm text-gray-700">
                            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                            {Math.min(currentPage * ITEMS_PER_PAGE, sortedStatus.length)} of{" "}
                            {sortedStatus.length}
                        </p>
                        <div className="space-x-2">
                            <button
                                className="px-3 py-1 bg-gray-200 text-sm rounded disabled:opacity-50"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <button
                                className="px-3 py-1 bg-gray-200 text-sm rounded disabled:opacity-50"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                {/* Modals */}
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
    );
};

export default Status;