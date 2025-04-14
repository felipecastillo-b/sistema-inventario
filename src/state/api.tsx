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
    phone: string;
    address: string;
}

export interface NewClient {
    clientId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
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

export interface Category {
    categoryId: string,
    name: string,
    description: string,
}

export interface NewCategory {
    categoryId: string,
    name: string,
    description: string,
}

export interface Role {
    roleId: number,
    name: string,
    description: string,
}

export interface NewRole {
    roleId: number,
    name: string,
    description: string,
}

export interface User {
    userId: string,
    name: string,
    email: string,
    password: string,
    roleId: number,
    statusId: number,
}

export interface NewUser {
    userId: string,
    name: string,
    email: string,
    password: string,
    roleId: number,
    statusId: number,
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: 'api',
    tagTypes: ["DashboardMetrics", "Products", "Clients", "Expenses", "Status", "Supplier", "Category", "Role", "User"],
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
        createClient: build.mutation<Client, NewClient>({
            query: (newClient) => ({
                url: "/clients",
                method: "POST",
                body: newClient
            }),
            invalidatesTags: ["Clients"]
        }),
        updateClient: build.mutation<Client, Client>({
            query: (updatedClient) => ({
                url: "/clients",
                method: "PUT",
                body: updatedClient,
            }),
            invalidatesTags: ["Clients"],
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
        // Category
        getCategory: build.query<Category[], void>({
            query: () => "/category",
            providesTags: ["Category"],
        }),
        createCategory: build.mutation<Category, NewCategory>({
            query: (newCategory) => ({
                url: "/category",
                method: "POST",
                body: newCategory
            }),
            invalidatesTags: ["Category"]
        }),
        updateCategory: build.mutation<Category, Category>({
            query: (updatedCategory) => ({
                url: "/category",
                method: "PUT",
                body: updatedCategory,
            }),
            invalidatesTags: ["Category"],
        }),
        // Role
        getRole: build.query<Role[], void>({
            query: () => "/role",
            providesTags: ["Role"],
        }),
        createRole: build.mutation<Role, NewRole>({
            query: (newRole) => ({
                url: "/role",
                method: "POST",
                body: newRole
            }),
            invalidatesTags: ["Role"]
        }),
        updateRole: build.mutation<Role, Role>({
            query: (updatedRole) => ({
                url: "/role",
                method: "PUT",
                body: updatedRole,
            }),
            invalidatesTags: ["Role"],
        }),
        // User
        getUser: build.query<User[], void>({
            query: () => "/user",
            providesTags: ["User"],
        }),
        createUser: build.mutation<User, NewUser>({
            query: (newUser) => ({
                url: "/user",
                method: "POST",
                body: newUser
            }),
            invalidatesTags: ["User"]
        }),
        updateUser: build.mutation<User, User>({
            query: (updatedUser) => ({
                url: "/user",
                method: "PUT",
                body: updatedUser,
            }),
            invalidatesTags: ["User"],
        }),
    }),
})

export const { 
    useGetDashboardMetricsQuery, 
    useGetProductsQuery, 
    useCreateProductMutation,
    useGetClientsQuery,
    useCreateClientMutation,
    useUpdateClientMutation,
    useGetExpensesByCategoryQuery,
    useGetStatusQuery,
    useCreateStatusMutation,
    useUpdateStatusMutation,
    useGetSupplierQuery,
    useCreateSupplierMutation,
    useUpdateSupplierMutation,
    useGetCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useGetRoleQuery,
    useCreateRoleMutation,
    useUpdateRoleMutation,
    useGetUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
} = api;