import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
    productId: string;
    categoryId: string;
    supplierId: string;
    statusId: number;
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
    stockMinimum: number;
    image_url?: string;
}

export interface NewProduct {
    categoryId: string;
    supplierId: string;
    statusId: number;
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
    stockMinimum: number;
    image_url?: string;
}

export interface Sale {
    saleId: string,
    productId: string,
    clientId: string,
    quantity: number,
    unitPrice: number,
    totalAmount: number,
    timestamp: string,
}

export interface NewSale {
    saleId: string,
    productId: string,
    clientId: string,
    quantity: number,
    unitPrice: number,
    totalAmount: number,
}

export interface Purchase {
    purchaseId: string,
    productId: string,
    quantity: number,
    unitCost: number,
    totalCost: number,
    timestamp: string,
}

export interface NewPurchase {
    purchaseId: string,
    productId: string,
    quantity: number,
    unitCost: number,
    totalCost: number,
}

export interface ExpenseByCategory {
    expenseByCategoryId: string;
    name: string;
    description: string;
    createdAt: string;
}

export interface NewExpenseByCategory {
    expenseByCategoryId: string;
    name: string;
    description: string;
}

export interface Expense {
    expenseId: string,
    expenseByCategoryId: string,
    description: string,
    amount: number,
    timestamp: string,
}

export interface NewExpense {
    expenseId: string,
    expenseByCategoryId: string,
    description: string,
    amount: number,
}

export interface DashboardMetrics {
    popularProducts: Product[];
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
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    reducerPath: 'api',
    tagTypes: ["DashboardMetrics", "Products", "Clients", "Status", "Supplier", "Category", "Role", "User", "Purchase", "Sale", "ExpenseByCategory", "Expense"],
    endpoints: (build) => ({
        // Dashboard
//        getDashboardMetrics: build.query<DashboardMetrics, void>({
//            query: () => "/dashboard",
//            providesTags: ["DashboardMetrics"]
//        }),
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
        updateProduct: build.mutation<Product, Product>({
            query: (updatedClient) => ({
                url: "/products",
                method: "PUT",
                body: updatedClient,
            }),
            invalidatesTags: ["Products"],
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
            query: () => "/users",
            providesTags: ["User"],
        }),
        createUser: build.mutation<User, NewUser>({
            query: (newUser) => ({
                url: "/users",
                method: "POST",
                body: newUser
            }),
            invalidatesTags: ["User"]
        }),
        updateUser: build.mutation<User, User>({
            query: (updatedUser) => ({
                url: "/users",
                method: "PUT",
                body: updatedUser,
            }),
            invalidatesTags: ["User"],
        }),
        // Purchase
        getPurchases: build.query<Purchase[], string | void>({
            query: () => "/finances/purchases",
            providesTags: ["Purchase"],
        }),
        createPurchase: build.mutation<Purchase, NewPurchase>({
            query: (newPurchase) => ({
                url: "/finances/purchases",
                method: "POST",
                body: newPurchase
            }),
            invalidatesTags: ["Purchase", "Products"]
        }),
        // Sale
        getSales: build.query<Sale[], string | void>({
            query: () => "/finances/sales",
            providesTags: ["Sale"],
        }),
        createSale: build.mutation<Sale, NewSale>({
            query: (newSale) => ({
                url: "/finances/sales",
                method: "POST",
                body: newSale
            }),
            invalidatesTags: ["Sale", "Products"]
        }),
        // Expense Category
        getExpenseByCategory: build.query<ExpenseByCategory[], string | void>({
            query: () => "/finances/expense-category",
            providesTags: ["ExpenseByCategory"],
        }),
        createExpenseByCategory: build.mutation<ExpenseByCategory, NewExpenseByCategory>({
            query: (newExpenseByCategory) => ({
                url: "/finances/expense-category",
                method: "POST",
                body: newExpenseByCategory
            }),
            invalidatesTags: ["ExpenseByCategory"]
        }),
        // Expense
        getExpenses: build.query<Expense[], string | void>({
            query: () => "/finances/expenses",
            providesTags: ["Expense"],
        }),
        createExpense: build.mutation<Expense, NewExpense>({
            query: (newExpense) => ({
                url: "/finances/expenses",
                method: "POST",
                body: newExpense
            }),
            invalidatesTags: ["Expense"]
        }),
        login: build.mutation<{ token: string}, { email: string; password: string }>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
})

export const { 
    //useGetDashboardMetricsQuery, 
    useGetProductsQuery, 
    useCreateProductMutation,
    useUpdateProductMutation,
    useGetClientsQuery,
    useCreateClientMutation,
    useUpdateClientMutation,
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
    useGetPurchasesQuery,
    useCreatePurchaseMutation,
    useGetSalesQuery,
    useCreateSaleMutation,
    useGetExpenseByCategoryQuery,
    useCreateExpenseByCategoryMutation,
    useGetExpensesQuery,
    useCreateExpenseMutation,
    useLoginMutation,
} = api;