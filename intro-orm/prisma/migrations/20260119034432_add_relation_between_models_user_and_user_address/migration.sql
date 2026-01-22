/*
  Warnings:

  - Added the required column `userId` to the `user_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_addresses" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
