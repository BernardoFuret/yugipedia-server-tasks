import path from 'node:path';

import winston from 'winston';

import { jsonReplacer, messageFormatter } from './formatters';
import { type IBaseLogger, type IBaseLoggerOptions } from './types';

const generateLogPath = (dirname: string, logFilename: string): string => {
  return path.join(dirname, '..', 'logs', logFilename);
};

const createBaseLogger = ({ srcDirname, isDebug = false }: IBaseLoggerOptions): IBaseLogger => {
  const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(messageFormatter),
  );

  const fileJsonFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json({ replacer: jsonReplacer }),
  );

  const fileTransportsOptions = {
    flags: 'w',
  };

  return winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: isDebug ? 'debug' : 'info',
        format: consoleFormat,
      }),
      new winston.transports.File({
        level: 'info',
        filename: generateLogPath(srcDirname, 'combined-json.log'),
        format: fileJsonFormat,
        options: fileTransportsOptions,
      }),
      new winston.transports.File({
        level: 'error',
        filename: generateLogPath(srcDirname, 'errors-json.log'),
        format: fileJsonFormat,
        options: fileTransportsOptions,
      }),
    ],
  });
};

export { createBaseLogger };
