import { Response } from 'swagger-jsdoc';
import { USER_ROLE } from '../../../utils/constant';
import { RESPONSE_CODE } from '../../constant';
import { ResponseCode } from '../../interface';

const response: Record<ResponseCode, Response> = {
  [RESPONSE_CODE.OK]: {} as Response,
  [RESPONSE_CODE.CREATED]: {
    description: 'User Created',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: 1,
            },
            username: {
              type: 'string',
              example: 'username',
            },
            email: {
              type: 'string',
              example: 'user@user.com',
            },
            role: {
              type: 'string',
              enum: [USER_ROLE.USER, USER_ROLE.ADMIN],
              example: USER_ROLE.USER,
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
    description: 'User with this email already exists | Internal Server Error',
  } as Response,
};

export default response;
