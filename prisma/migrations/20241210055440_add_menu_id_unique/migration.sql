/*
  Warnings:

  - You are about to drop the column `menuId` on the `MenuStats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `MenuStats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `MenuStats` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MenuStats_menuId_key";

-- AlterTable
ALTER TABLE "MenuStats" DROP COLUMN "menuId",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MenuStats_name_key" ON "MenuStats"("name");
