import { Options } from 'swagger-jsdoc';
import auth from './auth';
import users from './users';
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
    tags: [auth.tag, users.tag],
    paths: {
      ...auth.path,
      ...users.path,
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
