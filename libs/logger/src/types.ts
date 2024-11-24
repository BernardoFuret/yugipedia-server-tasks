interface IBaseLoggerMethod {
  (data: { message: unknown[]; label: string }): void;
}

interface IBaseLogger {
  debug: IBaseLoggerMethod;
  info: IBaseLoggerMethod;
  warn: IBaseLoggerMethod;
  error: IBaseLoggerMethod;
}

interface IBaseLoggerOptions {
  isDebug?: boolean;
  srcDirname: string;
}

interface ILogger {
  debug(...messageParts: unknown[]): this;
  info(...messageParts: unknown[]): this;
  warn(...messageParts: unknown[]): this;
  error(...messageParts: unknown[]): this;
}

interface ILoggerConstructorOptions {
  baseLogger: IBaseLogger;
  label: string;
}

interface ILoggerFactoryOptions extends IBaseLoggerOptions {
  label: string;
}

interface ILoggerConstructor {
  create(options: ILoggerFactoryOptions): ILogger;
}

export type {
  IBaseLogger,
  IBaseLoggerOptions,
  ILogger,
  ILoggerConstructor,
  ILoggerConstructorOptions,
  ILoggerFactoryOptions,
};
