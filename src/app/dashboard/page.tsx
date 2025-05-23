"use client"

import { useGetDashboardSummaryQuery } from "@/state/api"
import { DollarSign, ShoppingCart, Wallet } from "lucide-react"
import ProtectedRoute from "../(components)/ProtectedRoute"
import MetricCard from "./MetricCard"
import TopProducts from "./TopProducts"
import LowStock from "./LowStock"

const Dashboard = () => {
    const { data, isLoading, isError } = useGetDashboardSummaryQuery()

    return (
        <ProtectedRoute>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

                {isLoading && <div className="text-gray-500 animate-pulse">Loading summary...</div>}

                {isError && <div className="text-red-500">Error fetch dashboard.</div>}

                {data && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            <MetricCard title="Sales" value={data.sales} icon={<DollarSign className="w-5 h-5" />} color="green" />
                            <MetricCard title="Purchases" value={data.purchases} icon={<ShoppingCart className="w-5 h-5" />} color="blue" />
                            <MetricCard title="Expenses" value={data.expenses} icon={<Wallet className="w-5 h-5" />} color="red" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TopProducts products={data.topProducts} />
                            <LowStock products={data.lowStock} />
                        </div>
                    </>
                )}
            </div>
        </ProtectedRoute>
    )
}

export default Dashboard
