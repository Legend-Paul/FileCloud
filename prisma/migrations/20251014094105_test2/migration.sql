/*
  Warnings:

  - The primary key for the `session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `expire` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `sess` on the `session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sid]` on the table `session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `data` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."IDX_session_expire";

-- AlterTable
ALTER TABLE "session" DROP CONSTRAINT "session_pkey",
DROP COLUMN "expire",
DROP COLUMN "sess",
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "sid" SET DATA TYPE TEXT,
ADD CONSTRAINT "session_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "session_sid_key" ON "session"("sid");
