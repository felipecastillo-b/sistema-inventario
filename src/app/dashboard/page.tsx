"use client"

/* 
import { Package, Tag, TrendingDown, TrendingUp } from "lucide-react"
import CardExpenseSummary from "./CardExpenseSummary"
import CardPopularProducts from "./CardPopularProducts"
import CardPurchaseSummary from "./CardPurchaseSummary"
import CardSalesSummary from "./CardSalesSummary"
import StatCard from "./StatCard"
*/
import ProtectedRoute from "../(components)/ProtectedRoute"

/*
TODO StatCard estan Hardcodeadas
pensar si implementar la funcionalidad StatCard
o reemplazarla con otra estadistica
*/
const Dashboard = () => {
    return (

        /* 
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
            <CardPopularProducts />
            <CardSalesSummary />
            <CardPurchaseSummary />
            <CardExpenseSummary />
            <StatCard
                title="Most Profit Product"
                primaryIcon={<Tag className="text-blue-600 w-6 h-6" />}
                dateRange="All Time"
                details={[
                    {
                        title: "Sales",
                        amount: "175.00",
                        changePercentage: 131,
                        IconComponent: TrendingUp,
                    },
                    {
                        title: "Expenses",
                        amount: "10.00",
                        changePercentage: -56,
                        IconComponent: TrendingDown,
                    },
                ]}
            />
            <StatCard
                title="Most Profit Category"
                primaryIcon={<Package className="text-blue-600 w-6 h-6" />}
                dateRange="All Time"
                details={[
                    {
                        title: "Sales",
                        amount: "250.00",
                        changePercentage: 131,
                        IconComponent: TrendingUp,
                    },
                    {
                        title: "Expenses",
                        amount: "147",
                        changePercentage: -56,
                        IconComponent: TrendingDown,
                    },
                ]}
            />
            <StatCard
                title="Other Stat"
                primaryIcon={<Tag className="text-blue-600 w-6 h-6" />}
                dateRange="19 - 22 November 2025"
                details={[
                    {
                        title: "Sales",
                        amount: "1000.00",
                        changePercentage: 20,
                        IconComponent: TrendingUp,
                    },
                    {
                        title: "Discount",
                        amount: "200.00",
                        changePercentage: -10,
                        IconComponent: TrendingDown,
                    },
                ]}
            />        
        </div>
        */
        <ProtectedRoute>
            <h1>Dashboard</h1>
        </ProtectedRoute>
    )
}

export default Dashboard