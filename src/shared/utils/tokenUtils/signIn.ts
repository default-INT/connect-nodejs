import jwt from 'jsonwebtoken';
import { jwtSecrets } from 'shared/config/jwt';
import { IUserJwt } from 'shared/types/user';
import { ITokensDto } from 'shared/dto/ITokensDto';

export const signIn = (userDto: IUserJwt): ITokensDto => {
  if (!jwtSecrets.accessTokenSecret || !jwtSecrets.refreshTokenSecret) {
    throw new Error('JWT secret must be specified');
  }

  // exp after 2 hour
  const accessExpr = Math.floor(Date.now() / 1000) + 60 * 60 * 2;
  // exp after 1 month
  const refreshExpr = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;

  const accessToken = jwt.sign(
    {
      ...userDto,
      exp: accessExpr,
    },
    jwtSecrets.accessTokenSecret,
  );

  const refreshToken = jwt.sign(
    { ...userDto, exp: refreshExpr },
    jwtSecrets.refreshTokenSecret,
  );

  return {
    accessToken,
    refreshToken,
    accessExpiredAt: new Date(accessExpr * 1000).toISOString(),
    refreshExpiredAt: new Date(refreshExpr * 1000).toISOString(),
  };
};
