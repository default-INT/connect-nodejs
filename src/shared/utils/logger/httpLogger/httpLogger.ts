import { transports, createLogger, format } from 'winston';
import { appVersion } from 'shared/config/app';
import { LogIndentation } from 'shared/types/logs';

const { combine, timestamp, json, printf } = format;
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

const initLogger = () => createLogger({
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp: stamp, level, message, ...data }) => {
      const response = {
        level,
        message,
        stamp,
        appInfo: {
          appVersion,
          environment: process.env.NODE_ENV,
          proccessId: process.pid,
        },
        data,
      };

      return JSON.stringify(response, null, LogIndentation.SM);
    }),
  ),
  transports: [
    new transports.File({
      filename: 'logs/error-logs.log',
      level: 'error',
    }),
    new transports.File({
      filename: 'logs/info-logs.log',
      level: 'info',
    }),
  ],
});

export const httpLogger = initLogger();
