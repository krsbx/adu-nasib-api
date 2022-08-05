import { Router } from 'express';
import * as comments from '../middleware/comments';
import * as auths from '../middleware/auths';

const router = Router();

// POST /comments
router.post('/', auths.authMw, comments.createCommentMw, comments.returnCommentMw);

// GET /comments
router.get('/', comments.getCommentsMw, comments.returnCommentsMw);

// GET /comments/:id
router.get('/:id', comments.getCommentMw, comments.returnCommentMw);

// PATCH /comments/:id
router.patch(
  '/:id',
  auths.authMw,
  comments.getCommentMw,
  comments.updateCommentMw,
  comments.getCommentMw,
  comments.returnCommentMw
);

// DELETE /comments/:id
router.delete('/:id', auths.authMw, comments.getCommentMw, comments.deleteCommentMw);

export default router;
