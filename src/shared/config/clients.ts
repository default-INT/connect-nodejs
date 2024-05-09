import process from 'process';

export const clients = [
  process.env.WEB_CLIENT_ID,
  process.env.IOS_CLIENT_ID,
] as string[];
