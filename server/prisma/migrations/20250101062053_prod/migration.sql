/*
  Warnings:

  - Changed the type of `category` on the `ProductDetail` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `subCategory` on the `ProductDetail` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ProductDetail" DROP COLUMN "category",
ADD COLUMN     "category" "Gender" NOT NULL,
DROP COLUMN "subCategory",
ADD COLUMN     "subCategory" "SubCategory" NOT NULL;
