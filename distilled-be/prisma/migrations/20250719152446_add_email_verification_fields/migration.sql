/*
  Warnings:

  - The values [SIGNUP] on the enum `Deactivated` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Deactivated_new" AS ENUM ('ACTIVE', 'INACTIVE');
ALTER TABLE "Users" ALTER COLUMN "deactivated" TYPE "Deactivated_new" USING ("deactivated"::text::"Deactivated_new");
ALTER TYPE "Deactivated" RENAME TO "Deactivated_old";
ALTER TYPE "Deactivated_new" RENAME TO "Deactivated";
DROP TYPE "Deactivated_old";
COMMIT;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "emailVerificationToken" TEXT,
ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false;
