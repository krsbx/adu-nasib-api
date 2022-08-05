import { Router } from 'express';
import comments from './comments';
import users from './users';
import posts from './posts';

const router = Router();

router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);

export default router;
