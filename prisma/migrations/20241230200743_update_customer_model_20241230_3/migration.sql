/*
  Warnings:

  - The primary key for the `CustomerWishList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CustomerWishList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CustomerWishList" DROP CONSTRAINT "CustomerWishList_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "CustomerWishList_pkey" PRIMARY KEY ("customerId", "productId");
