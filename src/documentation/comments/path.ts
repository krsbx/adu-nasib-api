import { Paths } from 'swagger-jsdoc';
import { RESPONSE_CODE } from '../constant';
import response from './response';

const path: Paths = {
  '/comments': {
    post: {
      tags: ['Comment Collection'],
      summary: 'Create a new comment',
      parameters: [],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                content: {
                  type: 'string',
                  example: 'Lu mah mending, lah gw ...',
                },
                postId: {
                  type: 'number',
                  example: 1,
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
      tags: ['Comment Collection'],
      summary: 'Get all comments',
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
    },
    responses: {
      [RESPONSE_CODE.OK]: response.gets[RESPONSE_CODE.OK],
    },
  },
  '/comments/{id}': {
    get: {
      tags: ['Comment Collection'],
      summary: 'Get comment base on id',
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
      tags: ['Comment Collection'],
      summary: 'Update comment base on id',
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
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                content: {
                  type: 'string',
                  example: 'Lu mah mending, lah gw ...',
                },
              },
            },
          },
        },
      },
      responses: {
        [RESPONSE_CODE.OK]: response.update[RESPONSE_CODE.OK],
      },
    },
    delete: {
      tags: ['Comment Collection'],
      summary: 'Delete comment base on id',
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
