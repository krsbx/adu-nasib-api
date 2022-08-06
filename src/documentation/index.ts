import { Options } from 'swagger-jsdoc';
import auth from './auth';
import users from './users';
import posts from './posts';
import comments from './comments';
import securities from './components/security';

const documentation: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Adu Nasib API',
      version: '1.0.0',
      description: 'Rest API documentations for Adu Nasib',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
    tags: [auth.tag, users.tag, posts.tag, comments.tag],
    paths: {
      ...auth.path,
      ...users.path,
      ...posts.path,
      ...comments.path,
    },
    components: {
      securitySchemes: {
        ...securities,
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['../routes/*.js'],
};

export default documentation;
