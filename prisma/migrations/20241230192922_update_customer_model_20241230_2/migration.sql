/*
  Warnings:

  - You are about to drop the `CustomerWishlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CustomerWishlist" DROP CONSTRAINT "CustomerWishlist_customerId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerWishlist" DROP CONSTRAINT "CustomerWishlist_productId_fkey";

-- DropTable
DROP TABLE "CustomerWishlist";

-- CreateTable
CREATE TABLE "CustomerWishList" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerWishList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomerWishList" ADD CONSTRAINT "CustomerWishList_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerWishList" ADD CONSTRAINT "CustomerWishList_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
