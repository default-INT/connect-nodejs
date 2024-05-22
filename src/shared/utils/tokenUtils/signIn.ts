import jwt from 'jsonwebtoken';
import { jwtSecrets } from 'shared/config/jwt';
import { IUserJwt } from 'shared/types/user';
import { ITokensDto } from 'shared/dto/ITokensDto';
import { date } from 'shared/utils/date';
import { AddDateType } from 'shared/utils/date/add/add';

export const signIn = (userDto: IUserJwt): ITokensDto => {
  if (!jwtSecrets.accessTokenSecret || !jwtSecrets.refreshTokenSecret) {
    throw new Error('JWT secret must be specified');
  }

  const accessToken = jwt.sign(
    userDto,
    jwtSecrets.accessTokenSecret,
    { expiresIn: '2h' },
  );

  // TODO: need to return more correct date
  const accessExpiredAt = date.add(new Date(), 2)
    .toISOString();

  const refreshToken = jwt.sign(
    userDto,
    jwtSecrets.refreshTokenSecret,
    { expiresIn: '1d' },
  );

  const refreshExpiredAt = date.add(new Date(), 1, AddDateType.day)
    .toISOString();

  return { accessToken, refreshToken, accessExpiredAt, refreshExpiredAt };
};
