import { Router } from 'express';
import * as posts from '../middleware/posts';
import * as auths from '../middleware/auths';

const router = Router();

// POST /posts
router.post('/', auths.authMw, posts.createPostMw, posts.returnPostMw);

// GET /posts
router.get('/', posts.getPostsMw, posts.returnPostsMw);

// GET /posts/:id
router.get('/:id', posts.getPostMw, posts.returnPostMw);

// PATCH /posts/:id
router.patch(
  '/:id',
  auths.authMw,
  posts.getPostMw,
  posts.updatePostMw,
  posts.getPostMw,
  posts.returnPostMw
);

// DELETE /posts/:id
router.delete('/:id', auths.authMw, posts.getPostMw, posts.deletePostMw);

export default router;