import { Router } from 'express';
import * as auths from '../middleware/auths';
import * as posts from '../middleware/posts';

const router = Router();

// POST /posts
router.post('/', auths.verifyTokenMw, auths.verifyAuthMw, posts.createPostMw, posts.returnPostMw);

// GET /posts
router.get('/', auths.verifyTokenMw, posts.getPostsMw, posts.returnPostsMw);

// GET /posts/:id
router.get('/:id', auths.verifyTokenMw, posts.getPostMw, posts.returnPostMw);

// PATCH /posts/:id
router.patch(
  '/:id',
  auths.verifyTokenMw,
  auths.verifyAuthMw,
  posts.getPostMw,
  posts.updatePostMw,
  posts.getPostMw,
  posts.returnPostMw
);

// DELETE /posts/:id
router.delete('/:id', auths.verifyTokenMw, auths.verifyAuthMw, posts.getPostMw, posts.deletePostMw);

// POST /posts/:id/like
router.post(
  '/:id/like',
  auths.verifyTokenMw,
  auths.verifyAuthMw,
  posts.getPostMw,
  posts.likePostMw
);

// POST /posts/:id/dislike
router.post(
  '/:id/dislike',
  auths.verifyTokenMw,
  auths.verifyAuthMw,
  posts.getPostMw,
  posts.dislikePostMw
);

export default router;
