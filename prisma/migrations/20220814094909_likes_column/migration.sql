-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;