import { Router } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import auth from './auth';
import comments from './comments';
import users from './users';
import posts from './posts';
import documentation from '../documentation';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(documentation)));

export default router;
