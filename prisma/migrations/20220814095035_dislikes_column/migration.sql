-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "dislikes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "dislikes" INTEGER NOT NULL DEFAULT 0;
