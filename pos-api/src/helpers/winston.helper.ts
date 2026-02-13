import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, errors } = format;

const logFormat = printf(({ timestamp, level, message, stack, ...rest }) => {
  const meta = rest.meta ? JSON.stringify(rest.meta, null, 2) : '';
  return `[${timestamp}] ${level.toUpperCase()}: ${message} ${
    stack ? `\nStack: ${stack}` : ''
  } ${meta}`;
});

export const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true })
  ),
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        printf(({ message }) => {
          return typeof message === 'string'
            ? message
            : JSON.stringify(message);
        })
      ),
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: logFormat,
    }),
    ,
    new transports.File({
      filename: 'logs/combined.log',
      format: logFormat,
    }),
    ,
    new (transports as any).DailyRotateFile({
      filename: 'logs/%DATE%-app.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: logFormat,
    }),
  ],
});

/* 💡 Helper agar type-safe */
export const log = {
  error: (message: string, meta?: unknown) => logger.error({ message, meta }),
  warn: (message: string, meta?: unknown) => logger.warn({ message, meta }),
  info: (message: string, meta?: unknown) => logger.info({ message, meta }),
  http: (message: string, meta?: unknown) => logger.http({ message, meta }),
  debug: (message: string, meta?: unknown) => logger.debug({ message, meta }),
};