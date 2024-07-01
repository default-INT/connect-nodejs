import { env } from 'shared/config/env';

export const jwtSecrets = {
  accessTokenSecret: env.JWT_ACCESS_SECRET,
  refreshTokenSecret: env.JWT_REFRESH_SECRET,
};
