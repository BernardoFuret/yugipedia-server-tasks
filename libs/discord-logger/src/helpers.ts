import { inspect } from 'node:util';

const serializeError = (error: Error) => {
  return {
    error: true,
    type: error.name,
    message: error.message,
    cause: error.cause,
  };
};

// TODO: escape triple backtick?
const formatToPrint = (messageParts: unknown[]): string => {
  return messageParts
    .map((part) => {
      return typeof part === 'string'
        ? part
        : inspect(part instanceof Error ? serializeError(part) : part, { depth: 5, colors: false });
    })
    .join(' ')
    .substring(0, 2000);
};

const wrapMessageData = (message: string): string => `
\`\`\`json
${message}
\`\`\`
  `;

export { formatToPrint, wrapMessageData };
