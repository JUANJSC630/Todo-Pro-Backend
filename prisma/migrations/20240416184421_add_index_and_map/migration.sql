/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_checklistId_fkey";

-- DropTable
DROP TABLE "Item";

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "checked" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "valor" INTEGER,
    "checklistId" INTEGER NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "items_checklistId_idx" ON "items"("checklistId");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
