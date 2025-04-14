/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Suppliers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Clients_email_key" ON "Clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Suppliers_email_key" ON "Suppliers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
