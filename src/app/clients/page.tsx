"use client"

import { useCreateClientMutation, useGetClientsQuery, useUpdateClientMutation } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "../(components)/Header";
import CreateClientModal from "./CreateClientModal";
import UpdateClientModal from "./UpdateClientModal";
import ProtectedRoute from "../(components)/ProtectedRoute";

type ClientFormData = {
    clientId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
};

const ITEMS_PER_PAGE = 15;

const Clients = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<ClientFormData | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const { data: clients, isLoading, isError } = useGetClientsQuery();
    const [createClient] = useCreateClientMutation();
    const [updateClient] = useUpdateClientMutation();

    const handleCreateClient = async (clientData: ClientFormData) => {
        await createClient(clientData);
    };

    const handleUpdateClient = async (data: ClientFormData) => {
        await updateClient(data);
    };

    const filteredClients = clients?.filter((client) => {
        const search = searchTerm.toLowerCase();
        return (
            client.name.toLowerCase().includes(search) ||
            client.email.toLowerCase().includes(search) ||
            client.phone.toLowerCase().includes(search) ||
            client.address.toLowerCase().includes(search)
        );
    }) || [];

    const sortedClients = [...filteredClients].sort((a, b) => {
        if (a.name < b.name) return sortDirection === "asc" ? -1 : 1;
        if (a.name > b.name) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    const totalPages = Math.ceil(sortedClients.length / ITEMS_PER_PAGE);
    const paginatedClients = sortedClients.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    if (isLoading) return <div className="py-4">Loading...</div>;

    if (isError || !clients) {
        return (
            <ProtectedRoute>
                <div className="text-center text-red-500 py-4">
                    Failed to fetch Clients
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="mx-auto pb-5 w-full px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <Header name="Clients" />
                    <button
                        className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <PlusCircleIcon className="w-5 h-5 mr-2" />
                        Create Client
                    </button>
                </div>

                {/* Search */}
                <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <SearchIcon className="w-5 h-5 text-gray-500 mr-2" />
                        <input
                            className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                            placeholder="Search by name, email, phone or address..."
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                                    >
                                        Name {sortDirection === "asc" ? "↑" : "↓"}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paginatedClients.map((client) => (
                                    <tr key={client.clientId} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{client.clientId}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{client.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{client.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{client.phone}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{client.address}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                                                onClick={() => {
                                                    setSelectedClient(client);
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
                            {Math.min(currentPage * ITEMS_PER_PAGE, sortedClients.length)} of{" "}
                            {sortedClients.length}
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
    );
};

export default Clients;