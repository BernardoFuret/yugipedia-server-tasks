import { inspect } from 'node:util';

import type { IJsonReplacer, IMessageFormaterCreator } from './types';

const createMessageFormatter: IMessageFormaterCreator = ({ isColored = true } = {}) => {
  return ({ timestamp, level, label, message = [] }) => {
    const parsedMessage = message
      .map((part) => {
        return typeof part === 'string' ? part : inspect(part, { depth: 5, colors: isColored });
      })
      .join(' ');

    return `[${timestamp}] [${label}] [${level}]: ${parsedMessage}`;
  };
};

const serializeError = (error: Error) => {
  return {
    error: true,
    type: error.name,
    message: error.message,
    stack: error.stack,
    cause: error.cause,
  };
};

const jsonReplacer: IJsonReplacer = (_key, value) => {
  return value instanceof Error ? serializeError(value) : value;
};

export { createMessageFormatter, jsonReplacer };
