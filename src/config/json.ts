import cluster from 'cluster';
import { NextFunction, Request, Response } from 'express';
import { AnyRecord } from '../repository/models';

export const changeSendResponse = (req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send.bind(res);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res.send = (body: AnyRecord): any => {
    originalSend(body);

    cluster.worker?.kill();
  };

  next();
};
