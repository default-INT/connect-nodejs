import { NextFunction, Response } from 'express';
import { tokenUtils } from 'shared/utils/tokenUtils';
import { IRequest } from 'shared/types/http';
import { IUserJwt } from 'shared/types/user';

const KEY_WORD = 'Bearer';

export const authMiddleware = (req: IRequest, res: Response, next: NextFunction) => {
  const authorization = req?.headers.authorization as string;
  if (!authorization?.includes(KEY_WORD)) {
    return res.status(400)
      .json({ message: 'Incorrect Authorization header' });
  }
  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const decode = tokenUtils.verifyAccess(token);
  if (!decode) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.currentUser = decode as IUserJwt;
  next();
};
