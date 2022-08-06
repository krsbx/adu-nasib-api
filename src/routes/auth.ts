import { Router } from 'express';
import * as auths from '../middleware/auths';
import * as users from '../middleware/users';

const router = Router();

// POST /auth/login
router.post('/login', auths.loginMw);

// POST /auth/register
router.post('/register', users.createUserMw, users.returnUserMw);

export default router;
