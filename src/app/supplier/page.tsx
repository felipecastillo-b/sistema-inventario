"use client"

import { useCreateSupplierMutation, useGetSupplierQuery, useUpdateSupplierMutation
} from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "../(components)/Header";
import CreateSupplierModal from "./CreateSupplierModal";
import UpdateSupplierModal from "./UpdateSupplierModal";
import ProtectedRoute from "../(components)/ProtectedRoute";

type SupplierFormData = {
    supplierId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
};

const ITEMS_PER_PAGE = 15;

const Supplier = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<SupplierFormData | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const { data: suppliers, isLoading, isError } = useGetSupplierQuery();
    const [createSupplier] = useCreateSupplierMutation();
    const [updateSupplier] = useUpdateSupplierMutation();

    const handleCreateSupplier = async (supplierData: SupplierFormData) => {
        await createSupplier(supplierData);
    };

    const handleUpdateSupplier = async (data: SupplierFormData) => {
        await updateSupplier(data);
    };

    // Filtrado
    const filteredSuppliers = suppliers?.filter((supplier) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            supplier.name.toLowerCase().includes(searchLower) ||
            supplier.email.toLowerCase().includes(searchLower) ||
            supplier.phone.toLowerCase().includes(searchLower) ||
            supplier.address.toLowerCase().includes(searchLower)
        );
    }) || [];

    // Ordenamiento
    const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
        if (a.name < b.name) return sortDirection === "asc" ? -1 : 1;
        if (a.name > b.name) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    // Paginacion
    const totalPages = Math.ceil(sortedSuppliers.length / ITEMS_PER_PAGE);
    const paginatedSuppliers = sortedSuppliers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    if (isLoading) return <div className="py-4">Loading...</div>;

    if (isError || !suppliers) {
        return (
            <ProtectedRoute>
                <div className="text-center text-red-500 py-4">
                    Failed to fetch Suppliers
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="mx-auto pb-5 w-full px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <Header name="Suppliers" />
                    <button
                        className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <PlusCircleIcon className="w-5 h-5 mr-2" />
                        Create Supplier
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() =>
                                            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                                        }
                                    >
                                        Name {sortDirection === "asc" ? "↑" : "↓"}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Address
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paginatedSuppliers.map((supplier) => (
                                    <tr key={supplier.supplierId} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {supplier.supplierId}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{supplier.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{supplier.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{supplier.phone}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{supplier.address}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                                                onClick={() => {
                                                    setSelectedSupplier(supplier);
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
                            {Math.min(currentPage * ITEMS_PER_PAGE, sortedSuppliers.length)} of{" "}
                            {sortedSuppliers.length}
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
    );
};

export default Supplier;