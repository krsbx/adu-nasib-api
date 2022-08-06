import { RESPONSE_CODE } from './constant';

export type ResponseType = keyof typeof RESPONSE_CODE;

export type ResponseCode = typeof RESPONSE_CODE[ResponseType];
