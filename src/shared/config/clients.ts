import { env } from 'shared/config/env';

export const clients = [
  env.WEB_CLIENT_ID,
  env.IOS_CLIENT_ID,
] as string[];
