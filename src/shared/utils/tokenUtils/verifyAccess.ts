import jwt from 'jsonwebtoken';
import { jwtSecrets } from 'shared/config/jwt';

export const verifyAccess = (token: string) => {
  if (!jwtSecrets.accessTokenSecret) {
    throw new Error('JWT secret must be specified');
  }

  return jwt.verify(token, jwtSecrets.accessTokenSecret);
};
