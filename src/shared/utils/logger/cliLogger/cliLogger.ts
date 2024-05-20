import { createLogger, format, transports } from 'winston';
import { appVersion } from 'shared/config/app';

const { combine, label, timestamp, colorize, printf } = format;
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

const initLogger = () => createLogger({
  format: combine(
    label({ label: appVersion }),
    timestamp({ format: timestampFormat }),
    colorize({ level: true }),
    printf(
      ({
         level,
         message,
         label: field,
         timestamp: stamp,
      }) => `[${stamp}] ${level} (${field}): ${message}`,
    ),
  ),
  transports: [new transports.Console()],
});

export const cliLogger = initLogger();
