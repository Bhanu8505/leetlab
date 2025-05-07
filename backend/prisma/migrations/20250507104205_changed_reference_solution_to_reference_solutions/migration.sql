/*
  Warnings:

  - You are about to drop the column `referencSolution` on the `Problem` table. All the data in the column will be lost.
  - Added the required column `referencSolutions` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "referencSolution",
ADD COLUMN     "referencSolutions" JSONB NOT NULL;
