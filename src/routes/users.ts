import { Router } from 'express';
import * as users from '../middleware/users';
import * as auths from '../middleware/auths';
import posts from './posts';
import comments from './comments';

const router = Router();

// POST /users
router.post('/', users.createUserMw, users.returnUserMw);

// GET /users
router.get('/', users.getUsersMw, users.returnUsersMw);

// GET /users/:id
router.get('/:id', users.getUserMw, users.returnUserMw);

// PATCH /users/:id
router.patch(
  '/:id',
  auths.authMw,
  users.getUserMw,
  users.updateUserMw,
  users.getUserMw,
  users.returnUserMw
);

// DELETE /users/:id
router.delete('/:id', auths.authMw, users.deleteUserMw);

// All /users/:id/posts
router.use('/:id/posts', users.getUserMw, posts);

// All /users/:id/comments
router.get('/:id/comments', users.getUserMw, comments);

export default router;
