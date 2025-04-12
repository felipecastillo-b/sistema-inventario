import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
    productId: string;
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
    stockMinimum: number;
    image_url?: string;
}

export interface NewProduct {
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
    stockMinimum: number;
    image_url?: string;
}

export interface SalesSummary {
    salesSummaryId: string;
    totalValue: number;
    changePercentage?: number;
    date: string;
}

export interface PurchaseSummary {
    purchaseSummaryId: string;
    totalPurchased: number;
    changePercentage?: number;
    date: string;
}

export interface ExpenseSummary {
    expenseSummaryId: string;
    totalExpenses: number;
    date: string;
}

export interface ExpenseByCategorySummary {
    expenseByCategoryId: string;
    //expenseSummaryId: string;
    category: string;
    amount: string;
    date: string;
}

export interface DashboardMetrics {
    popularProducts: Product[];
    salesSummary: SalesSummary[];
    purchaseSummary: PurchaseSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface Client {
    clientId: string;
    name: string;
    email: string;
}

export interface Status {
    statusId: number;
    name: string;
    description: string;
}

export interface NewStatus {
    statusId: number;
    name: string;
    description: string;
}

export interface Supplier {
    supplierId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface NewSupplier {
    supplierId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: 'api',
    tagTypes: ["DashboardMetrics", "Products", "Clients", "Expenses", "Status", "Supplier"],
    endpoints: (build) => ({
        // Dashboard
        getDashboardMetrics: build.query<DashboardMetrics, void>({
            query: () => "/dashboard",
            providesTags: ["DashboardMetrics"]
        }),
        // Products
        getProducts: build.query<Product[], string | void>({
            query: (search) => ({
                url: "/products",
                params: search ? { search } : {}
            }),
            providesTags: ["Products"]
        }),
        createProduct: build.mutation<Product, NewProduct>({
            query: (newProduct) => ({
                url: "/products",
                method: "POST",
                body: newProduct
            }),
            invalidatesTags: ["Products"]
        }),
        // Clients
        getClients: build.query<Client[], void>({
            query: () => "/clients",
            providesTags: ["Clients"],
        }),
        // Expenses
        getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
            query: () => "/expenses",
            providesTags: ["Expenses"],
        }),
        // Status
        getStatus: build.query<Status[], void>({
            query: () => "/status",
            providesTags: ["Status"],
        }),
        createStatus: build.mutation<Status, NewStatus>({
            query: (newStatus) => ({
                url: "/status",
                method: "POST",
                body: newStatus
            }),
            invalidatesTags: ["Status"]
        }),
        updateStatus: build.mutation<Status, Status>({
            query: (updatedStatus) => ({
                url: "/status",
                method: "PUT",
                body: updatedStatus,
            }),
            invalidatesTags: ["Status"],
        }),
        // Supplier
        getSupplier: build.query<Supplier[], void>({
            query: () => "/supplier",
            providesTags: ["Supplier"],
        }),
        createSupplier: build.mutation<Supplier, NewSupplier>({
            query: (newSupplier) => ({
                url: "/supplier",
                method: "POST",
                body: newSupplier
            }),
            invalidatesTags: ["Supplier"]
        }),
        updateSupplier: build.mutation<Supplier, Supplier>({
            query: (updatedSupplier) => ({
                url: "/supplier",
                method: "PUT",
                body: updatedSupplier,
            }),
            invalidatesTags: ["Supplier"],
        }),
    }),
})

export const { 
    useGetDashboardMetricsQuery, 
    useGetProductsQuery, 
    useCreateProductMutation,
    useGetClientsQuery,
    useGetExpensesByCategoryQuery,
    useGetStatusQuery,
    useCreateStatusMutation,
    useUpdateStatusMutation,
    useGetSupplierQuery,
    useCreateSupplierMutation,
    useUpdateSupplierMutation,
} = api;