import jwt from 'jsonwebtoken';
import { jwtSecrets } from 'shared/config/jwt';

export const verifyRefresh = (token: string) => {
  if (!jwtSecrets.refreshTokenSecret) {
    throw new Error('JWT secret must be specified');
  }

  return jwt.verify(token, jwtSecrets.refreshTokenSecret);
};
