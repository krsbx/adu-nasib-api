import { Router } from 'express';
import * as comments from '../middleware/comments';

const router = Router();

// POST /comments
router.post('/', comments.createCommentMw, comments.returnCommentMw);

// GET /comments
router.get('/', comments.getCommentsMw, comments.returnCommentsMw);

// GET /comments/:id
router.get('/:id', comments.getCommentMw, comments.returnCommentMw);

// PATCH /comments/:id
router.patch('/:id', comments.updateCommentMw, comments.returnCommentMw);

// DELETE /comments/:id
router.delete('/:id', comments.deleteCommentMw);

export default router;
