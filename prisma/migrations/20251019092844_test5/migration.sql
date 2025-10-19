/*
  Warnings:

  - You are about to drop the column `filename` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `originalname` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[folderId,name]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."File_folderId_filename_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "filename",
DROP COLUMN "originalname",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "File_folderId_name_key" ON "File"("folderId", "name");
