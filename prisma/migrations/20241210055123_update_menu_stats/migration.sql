/*
  Warnings:

  - A unique constraint covering the columns `[menuId]` on the table `MenuStats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `menuId` to the `MenuStats` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MenuStats_menuName_key";

-- AlterTable
ALTER TABLE "MenuStats" ADD COLUMN     "menuId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Notice" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "MenuStats_menuId_key" ON "MenuStats"("menuId");
