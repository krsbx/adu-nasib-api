import { Router } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import documentation from '../documentation';
import auth from './auth';
import comments from './comments';
import posts from './posts';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(documentation)));

export default router;
