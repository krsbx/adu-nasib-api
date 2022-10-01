-- DropForeignKey
ALTER TABLE "comment-dislikes" DROP CONSTRAINT "comment-dislikes_commentId_fkey";

-- DropForeignKey
ALTER TABLE "comment-dislikes" DROP CONSTRAINT "comment-dislikes_userId_fkey";

-- DropForeignKey
ALTER TABLE "comment-likes" DROP CONSTRAINT "comment-likes_commentId_fkey";

-- DropForeignKey
ALTER TABLE "comment-likes" DROP CONSTRAINT "comment-likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "post-dislikes" DROP CONSTRAINT "post-dislikes_postId_fkey";

-- DropForeignKey
ALTER TABLE "post-dislikes" DROP CONSTRAINT "post-dislikes_userId_fkey";

-- DropForeignKey
ALTER TABLE "post-likes" DROP CONSTRAINT "post-likes_postId_fkey";

-- DropForeignKey
ALTER TABLE "post-likes" DROP CONSTRAINT "post-likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_userId_fkey";

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post-likes" ADD CONSTRAINT "post-likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post-likes" ADD CONSTRAINT "post-likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment-likes" ADD CONSTRAINT "comment-likes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment-likes" ADD CONSTRAINT "comment-likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post-dislikes" ADD CONSTRAINT "post-dislikes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post-dislikes" ADD CONSTRAINT "post-dislikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment-dislikes" ADD CONSTRAINT "comment-dislikes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment-dislikes" ADD CONSTRAINT "comment-dislikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
