import { Router } from 'express';
import * as auths from '../middleware/auths';

const router = Router();

router.post('/login', auths.loginMw);

export default router;
