/*
  Warnings:

  - You are about to drop the column `posterUrl` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Movie" DROP COLUMN "posterUrl",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "poster" TEXT;
