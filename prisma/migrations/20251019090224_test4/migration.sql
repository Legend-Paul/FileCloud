/*
  Warnings:

  - You are about to drop the column `name` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[folderId,filename]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `filename` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalname` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."File_folderId_name_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "name",
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "originalname" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "File_folderId_filename_key" ON "File"("folderId", "filename");
