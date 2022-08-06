// Just copy pase this file and rename the file name to specify response name.
// this file just to make it easier to use.

import { Response } from 'swagger-jsdoc';
import { RESPONSE_CODE } from '../constant';
import { ResponseCode } from '../interface';

const response: Record<ResponseCode, Response> = {
  [RESPONSE_CODE.OK]: {} as Response,
  [RESPONSE_CODE.CREATED]: {} as Response,
  [RESPONSE_CODE.NO_CONTENT]: {} as Response,
  [RESPONSE_CODE.BAD_REQUEST]: {} as Response,
  [RESPONSE_CODE.UNAUTHORIZED]: {} as Response,
  [RESPONSE_CODE.FORBIDDEN]: {} as Response,
  [RESPONSE_CODE.NOT_FOUND]: {} as Response,
  [RESPONSE_CODE.INTERNAL_SERVER_ERROR]: {} as Response,
};

export default response;
