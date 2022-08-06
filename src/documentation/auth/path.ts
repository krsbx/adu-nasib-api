import { Paths } from 'swagger-jsdoc';
import { RESPONSE_CODE } from '../constant';
import response from './response';

const path: Paths = {
  '/auth/login': {
    post: {
      tags: ['Auth Collection'],
      summary: 'Authorize user to access API',
      parameters: [],
      requestBody: {
        required: true,
        description: 'User credentials',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'user@user.com',
                },
                password: {
                  type: 'string',
                  format: 'password',
                  example: 'password',
                },
              },
            },
          },
        },
      },
      responses: {
        [RESPONSE_CODE.OK]: response.login[RESPONSE_CODE.OK],
        [RESPONSE_CODE.UNAUTHORIZED]: response.login[RESPONSE_CODE.UNAUTHORIZED],
        [RESPONSE_CODE.NOT_FOUND]: response.login[RESPONSE_CODE.NOT_FOUND],
      },
    },
  },
  '/auth/register': {
    post: {
      tags: ['Auth Collection'],
      summary: 'Register new user',
      parameters: [],
      requestBody: {
        required: true,
        description: 'User informations',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                  example: 'username',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'user@user.com',
                },
                password: {
                  type: 'string',
                  format: 'password',
                  example: 'password',
                },
              },
            },
          },
        },
      },
      responses: {
        [RESPONSE_CODE.CREATED]: response.register[RESPONSE_CODE.CREATED],
        [RESPONSE_CODE.INTERNAL_SERVER_ERROR]:
          response.register[RESPONSE_CODE.INTERNAL_SERVER_ERROR],
      },
    },
  },
};

export default path;
