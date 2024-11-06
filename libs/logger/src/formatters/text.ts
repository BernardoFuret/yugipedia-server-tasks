import { inspect } from 'node:util';

import type { IMessageFormaterCreator } from './types';

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

export { createMessageFormatter };
