/*
  Warnings:

  - The values [S,M,L] on the enum `Size` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `mainImg` to the `ProductDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Size_new" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'XL', 'XXL');
ALTER TABLE "ProductDetail" ALTER COLUMN "sizes" TYPE "Size_new"[] USING ("sizes"::text::"Size_new"[]);
ALTER TYPE "Size" RENAME TO "Size_old";
ALTER TYPE "Size_new" RENAME TO "Size";
DROP TYPE "Size_old";
COMMIT;

-- AlterTable
ALTER TABLE "ProductDetail" ADD COLUMN     "imgs" TEXT[],
ADD COLUMN     "mainImg" TEXT NOT NULL;
