/*
  Warnings:

  - You are about to drop the `_OrderToProductDetail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrderToProductDetail" DROP CONSTRAINT "_OrderToProductDetail_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProductDetail" DROP CONSTRAINT "_OrderToProductDetail_B_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "productId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_OrderToProductDetail";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ProductDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;
