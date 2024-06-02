import jwt from 'jsonwebtoken';
import { jwtSecrets } from 'shared/config/jwt';
import { ForbiddenError } from 'shared/errors/403/ForbiddenError';

export const verifyRefresh = (token: string) => {
  if (!jwtSecrets.refreshTokenSecret) {
    throw new ForbiddenError('JWT secret must be specified');
  }

  return jwt.verify(token, jwtSecrets.refreshTokenSecret);
};
