import path from 'node:path';

import winston from 'winston';

import { createMessageFormatter, jsonReplacer } from './formatters';
import { type IBaseLogger, type IBaseLoggerOptions } from './types';

const generateLogPath = (dirname: string, logFilename: string): string => {
  return path.join(dirname, '..', 'logs', logFilename);
};

const createBaseLogger = ({ srcDirname, isDebug = false }: IBaseLoggerOptions): IBaseLogger => {
  const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(createMessageFormatter()),
  );

  const fileTextFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(createMessageFormatter({ isColored: false })),
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
      // Console
      new winston.transports.Console({
        level: isDebug ? 'debug' : 'info',
        format: consoleFormat,
      }),
      // Files as text
      new winston.transports.File({
        level: 'info',
        filename: generateLogPath(srcDirname, 'combined.log'),
        format: fileTextFormat,
        options: fileTransportsOptions,
      }),
      new winston.transports.File({
        level: 'error',
        filename: generateLogPath(srcDirname, 'errors.log'),
        format: fileTextFormat,
        options: fileTransportsOptions,
      }),
      // Files as JSON
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
