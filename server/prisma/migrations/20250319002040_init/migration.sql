-- CreateTable
CREATE TABLE "Clients" (
    "clientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("clientId")
);

-- CreateTable
CREATE TABLE "Users" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Roles" (
    "roleId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "Status" (
    "statusId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("statusId")
);

-- CreateTable
CREATE TABLE "Products" (
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "rating" DOUBLE PRECISION,
    "stockQuantity" INTEGER NOT NULL,
    "stockMinimum" INTEGER NOT NULL,
    "image_url" TEXT,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Sales" (
    "saleId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("saleId")
);

-- CreateTable
CREATE TABLE "Purchases" (
    "purchaseId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitCost" DOUBLE PRECISION NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Purchases_pkey" PRIMARY KEY ("purchaseId")
);

-- CreateTable
CREATE TABLE "Expenses" (
    "expenseId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("expenseId")
);

-- CreateTable
CREATE TABLE "SalesSummary" (
    "salesSummaryId" TEXT NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "changePercentage" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesSummary_pkey" PRIMARY KEY ("salesSummaryId")
);

-- CreateTable
CREATE TABLE "PurchaseSummary" (
    "purchaseSummaryId" TEXT NOT NULL,
    "totalPurchased" DOUBLE PRECISION NOT NULL,
    "changePercentage" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseSummary_pkey" PRIMARY KEY ("purchaseSummaryId")
);

-- CreateTable
CREATE TABLE "ExpenseSummary" (
    "expenseSummaryId" TEXT NOT NULL,
    "totalExpenses" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseSummary_pkey" PRIMARY KEY ("expenseSummaryId")
);

-- CreateTable
CREATE TABLE "ExpenseByCategory" (
    "expenseByCategoryId" TEXT NOT NULL,
    "expenseSummaryId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseByCategory_pkey" PRIMARY KEY ("expenseByCategoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Roles_name_key" ON "Roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Status_name_key" ON "Status"("name");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("statusId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseByCategory" ADD CONSTRAINT "ExpenseByCategory_expenseSummaryId_fkey" FOREIGN KEY ("expenseSummaryId") REFERENCES "ExpenseSummary"("expenseSummaryId") ON DELETE RESTRICT ON UPDATE CASCADE;
