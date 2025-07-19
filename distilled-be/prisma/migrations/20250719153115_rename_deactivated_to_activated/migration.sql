/*
  Warnings:

  - You are about to drop the column `deactivated` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "deactivated",
ADD COLUMN     "activated" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "Deactivated";
