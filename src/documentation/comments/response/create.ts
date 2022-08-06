import { Response } from 'swagger-jsdoc';
import { RESPONSE_CODE } from '../../constant';
import { ResponseCode } from '../../interface';

const response: Record<ResponseCode, Response> = {
  [RESPONSE_CODE.OK]: {} as Response,
  [RESPONSE_CODE.CREATED]: {
    description: 'Create new comment',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            content: {
              type: 'string',
              example: 'Lu mah mending, lah gw ...',
            },
            userId: {
              type: 'number',
              example: 1,
            },
            postId: {
              type: 'number',
              example: 1,
            },
          },
        },
      },
    },
  } as Response,
  [RESPONSE_CODE.NO_CONTENT]: {} as Response,
  [RESPONSE_CODE.BAD_REQUEST]: {} as Response,
  [RESPONSE_CODE.UNAUTHORIZED]: {} as Response,
  [RESPONSE_CODE.FORBIDDEN]: {} as Response,
  [RESPONSE_CODE.NOT_FOUND]: {} as Response,
  [RESPONSE_CODE.INTERNAL_SERVER_ERROR]: {
    description: 'Internal Server Error',
  } as Response,
};

export default response;
