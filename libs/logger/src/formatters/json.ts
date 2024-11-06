import type { IJsonReplacer } from './types';

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

export { jsonReplacer };
