import { Request, Response } from 'express';
import { HTTPHeaders } from 'shared/types/http';

interface IArgs {
  req: Request,
  res: Response,
  body?: any,
  reqStartTime: number;
}

export const formatHttpLog = (args: IArgs) => {
  const { req, res, body, reqStartTime } = args;
  const endTime = Date.now() - reqStartTime;
  const duration = `${endTime / 1000}s`;

  return {
    request: {
      headers: req.headers,
      host: req.headers.host,
      baseUrl: req.baseUrl,
      url: req.url,
      method: req.method,
      body: req.body,
      params: req?.params,
      query: req?.query,
      clientIp: req?.headers[HTTPHeaders.ForwardedFor] ?? req?.socket.remoteAddress,
    },
    response: {
      headers: res.getHeaders(),
      statusCode: res.statusCode,
      duration,
      body,
    },
  };
};
