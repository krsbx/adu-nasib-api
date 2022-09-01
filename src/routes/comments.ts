import { Router } from 'express';
import * as comments from '../middleware/comments';
import * as auths from '../middleware/auths';

const router = Router();

// POST /comments
router.post(
  '/',
  auths.verifyTokenMw,
  auths.verifyAuthMw,
  comments.createCommentMw,
  comments.returnCommentMw
);

// GET /comments
router.get('/', auths.verifyTokenMw, comments.getCommentsMw, comments.returnCommentsMw);

// GET /comments/:id
router.get('/:id', auths.verifyTokenMw, comments.getCommentMw, comments.returnCommentMw);

// PATCH /comments/:id
router.patch(
  '/:id',
  auths.verifyTokenMw,
  auths.verifyAuthMw,
  comments.getCommentMw,
  comments.updateCommentMw,
  comments.getCommentMw,
  comments.returnCommentMw
);

// DELETE /comments/:id
router.delete(
  '/:id',
  auths.verifyTokenMw,
  auths.verifyAuthMw,
  comments.getCommentMw,
  comments.deleteCommentMw
);

// POST /comments/:id/like
router.post(
  '/:id/like',
  auths.verifyTokenMw,
  auths.verifyAuthMw,
  comments.getCommentMw,
  comments.likeCommentMw
);

// POST /comments/:id/dislike
router.post(
  '/:id/dislike',
  auths.verifyTokenMw,
  auths.verifyAuthMw,
  comments.getCommentMw,
  comments.dislikeCommentMw
);

export default router;
