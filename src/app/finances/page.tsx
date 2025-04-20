"use client"

import Header from "../(components)/Header";
import { useRouter } from "next/navigation";

const Finances = () => {
    const router = useRouter();

    return (
        <div className="mx-auto pb-5 w-full">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <Header name="Finances" />
            </div>

            {/* Finances Cards (Purchase, Sale, Expense) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Purchase Card */}
                    <div className="border border-red-500 shadow rounded-md p-4 bg-white">
                        <div className="flex flex-col space-y-2">
                            <h3 className="text-lg font-semibold text-gray-800 text-center">Purchases History</h3>
                            <p className="text-sm text-gray-600 text-center">View Purchases History and add Product Purchases.</p>
                            <button
                                className="mt-4 bg-purple-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                Add Purchase Soon...
                            </button>
                            <button
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                onClick={() => router.push('/finances/purchases')}
                            >
                                Go Purchases History
                            </button>
                        </div>
                    </div>

                {/* Sale Card */}
                    <div className="border border-green-500 shadow rounded-md p-4 bg-white">
                        <div className="flex flex-col space-y-2">
                            <h3 className="text-lg font-semibold text-gray-800 text-center">Sales History</h3>
                            <p className="text-sm text-gray-600 text-center">View Sales History and add Product Sales.</p>
                            <button
                                className="mt-4 bg-purple-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                Add Sale Soon...
                            </button>
                            <button
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                Go Sales History
                            </button>
                        </div>
                    </div>

                {/* Expense Card */}
                    <div className="border border-yellow-500 shadow rounded-md p-4 bg-white">
                        <div className="flex flex-col space-y-2">
                            <h3 className="text-lg font-semibold text-gray-800 text-center">Expenses History</h3>
                            <p className="text-sm text-gray-600 text-center">View Expense History and add Expenses.</p>
                            <button
                                className="mt-4 bg-purple-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                Add Expense Soon...
                            </button>
                            <button
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                Go Expenses History
                            </button>
                        </div>
                    </div>
            </div>

        </div>
    );
};

export default Finances;
