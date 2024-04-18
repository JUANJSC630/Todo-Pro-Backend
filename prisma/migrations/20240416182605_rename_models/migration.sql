/*
  Warnings:

  - You are about to drop the `ChecklistItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChecklistItem" DROP CONSTRAINT "ChecklistItem_checklistId_fkey";

-- DropTable
DROP TABLE "ChecklistItem";

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "checked" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "valor" INTEGER,
    "checklistId" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_checklistId_key" ON "Item"("checklistId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
