/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useGetExpenseByCategoryQuery, useCreateExpenseByCategoryMutation } from "@/state/api";
import { ChevronLeft, ChevronRight, CornerDownLeft, PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Header from "@/app/(components)/Header";
import CreateExpenseByCategoryModal from "./CreateExpenseByCategoryModal";

type ExpenseByCategoryFormData = {
    expenseByCategoryId: string;
    name: string;
    description: string;
};

const ITEMS_PER_PAGE = 15;

const ExpenseByCategory = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{ key: 'createdAt'; direction: 'desc' }>({ 
        key: 'createdAt', 
        direction: 'desc' 
    });
    const { data: expenseByCategories, isLoading, isError } = useGetExpenseByCategoryQuery();
    const [createExpenseByCategory] = useCreateExpenseByCategoryMutation();

    const handleCreateExpenseByCategory = async (expenseByCategoryData: ExpenseByCategoryFormData) => {
        try {
            await createExpenseByCategory(expenseByCategoryData).unwrap();
        } catch (error) {
            console.error('Error creating expenseByCategory:', error);
        }
    };

    const filteredExpenseByCategories = expenseByCategories?.filter((expenseByCategory: any) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            expenseByCategory.expenseByCategoryId.includes(searchTerm) ||
            expenseByCategory.productId.includes(searchTerm)
        );
    }) || [];

    const sortedExpenseByCategories = [...filteredExpenseByCategories].sort((a, b) => {
        // Ordenar por fecha por defecto (createdAt)
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        
        if (sortConfig.key === 'createdAt') {
            return sortConfig.direction === 'desc' ? dateB - dateA : dateA - dateB;
        }
        
        // Ordenacion normal para otros campos
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // Paginacion
    const totalPages = Math.ceil(sortedExpenseByCategories.length / ITEMS_PER_PAGE);
    const paginatedExpenseByCategories = sortedExpenseByCategories.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Manejar cambio de pagina
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    // Resetear a pagina 1 cuando cambia el filtro
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // Solicitar ordenacion
    const requestSort = (key: keyof ExpenseByCategory) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    if (isLoading) return <div className="py-4">Loading...</div>;

    if (isError || !expenseByCategories) {
        return (
            <div className="text-center text-red-500 py-4">
                Failed to fetch ExpenseByCategory
            </div>
        );
    }

    return (
<div className="mx-auto pb-5 w-full px-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <Header name="Expense Category" />
                <button
                    className="flex items-center bg-blue-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    onClick={() => router.push('/finances')}
                >
                    <CornerDownLeft className="w-5 h-5 mr-2" />
                    Go back Finances
                </button>
                <button
                    className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Add Expense Category
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                    <SearchIcon className="w-5 h-5 text-gray-500 mr-2" />
                    <input
                        className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        placeholder="Search by ExpenseByCategory ID or Product ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* ExpenseByCategory Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => requestSort('expenseByCategoryId')}
                                >
                                    ID ExpenseByCategory{sortConfig?.key === 'expenseByCategoryId' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                >
                                    Category Name
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                >
                                    Description
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => requestSort('createdAt')}
                                >
                                    Date {sortConfig?.key === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedExpenseByCategories.map((expenseByCategory) => (
                                <tr key={expenseByCategory.expenseByCategoryId} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {expenseByCategory.expenseByCategoryId}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {expenseByCategory.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {expenseByCategory.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(expenseByCategory.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
                                <span className="font-medium">
                                    {Math.min(currentPage * ITEMS_PER_PAGE, sortedExpenseByCategories.length)}
                                </span>{' '}
                                of <span className="font-medium">{sortedExpenseByCategories.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                                        currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="sr-only">Previous</span>
                                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                </button>
                                
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                            currentPage === page
                                                ? 'z-10 bg-purple-600 border-purple-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                                        currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="sr-only">Next</span>
                                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create ExpenseByCategory Modal */}
            <CreateExpenseByCategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateExpenseByCategory}
            />
        </div>
    );
};

export default ExpenseByCategory;
