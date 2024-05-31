import { NextFunction, Response, Request } from 'express';
import { tokenUtils } from 'shared/utils/tokenUtils';
import { IUserJwt } from 'shared/types/user';
import { UnauthorizedError } from 'shared/errors/401/UnauthorizedError';

const KEY_WORD = 'Bearer';

export const authMiddleware = (req: Request, _: Response, next: NextFunction) => {
  const authorization = req?.headers.authorization as string;
  if (!authorization || !authorization?.includes(KEY_WORD)) {
    throw new UnauthorizedError('Incorrect Authorization header');
  }

  const token = authorization.split(' ')[1];

  if (!token) throw new UnauthorizedError('Incorrect Authorization header');

  const decode = tokenUtils.verifyAccess(token);

  if (!decode) throw new UnauthorizedError();

  req.currentUser = decode as IUserJwt;
  next();
};
