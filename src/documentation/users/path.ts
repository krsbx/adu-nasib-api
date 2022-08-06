import { Paths } from 'swagger-jsdoc';
import { RESPONSE_CODE } from '../constant';
import response from './response';

const path: Paths = {
  '/users': {
    post: {
      tags: ['User Collection'],
      summary: 'Create a new user',
      parameters: [],
      requestBody: {
        required: true,
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
        [RESPONSE_CODE.CREATED]: response.create[RESPONSE_CODE.CREATED],
        [RESPONSE_CODE.INTERNAL_SERVER_ERROR]: response.create[RESPONSE_CODE.INTERNAL_SERVER_ERROR],
      },
    },
    get: {
      tags: ['User Collection'],
      summary: 'Get all users',
      parameters: [
        {
          in: 'query',
          name: 'limit',
          required: false,
          schema: {
            type: 'string',
            example: 10,
          },
        },
        {
          in: 'query',
          name: 'page',
          required: false,
          schema: {
            type: 'number',
            example: 1,
          },
        },
      ],
      responses: {
        [RESPONSE_CODE.OK]: response.gets[RESPONSE_CODE.OK],
      },
    },
  },
  '/users/{id}': {
    get: {
      tags: ['User Collection'],
      summary: 'Get a user by id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'number',
            example: 1,
          },
        },
      ],
      responses: {
        [RESPONSE_CODE.OK]: response.get[RESPONSE_CODE.OK],
        [RESPONSE_CODE.NOT_FOUND]: response.get[RESPONSE_CODE.NOT_FOUND],
      },
    },
    patch: {
      tags: ['User Collection'],
      summary: 'Update a user by id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'number',
            example: 1,
          },
        },
      ],
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
        [RESPONSE_CODE.OK]: response.update[RESPONSE_CODE.OK],
        [RESPONSE_CODE.INTERNAL_SERVER_ERROR]: response.update[RESPONSE_CODE.INTERNAL_SERVER_ERROR],
      },
    },
    delete: {
      tags: ['User Collection'],
      summary: 'Delete a user by id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'number',
            example: 1,
          },
        },
      ],
      responses: {
        [RESPONSE_CODE.OK]: response.delete[RESPONSE_CODE.OK],
      },
    },
  },
};

export default path;
