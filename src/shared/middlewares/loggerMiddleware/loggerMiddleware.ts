import { NextFunction, Request, Response } from 'express';
import { httpLogger } from 'shared/utils/logger/httpLogger';
import { formatHttpLog } from 'shared/utils/logger/formatHttpLog';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const reqStartTime = Date.now();
  const originalSend = res.send;

  res.send = function (body): Response {
    if (res.statusCode < 400) {
      httpLogger.info(req.method, formatHttpLog({ req, res, reqStartTime, body }));
    } else {
      httpLogger.error(req.method, formatHttpLog({ req, res, reqStartTime, body }));
    }

    return originalSend.call(this, body);
  };

  next();
};
