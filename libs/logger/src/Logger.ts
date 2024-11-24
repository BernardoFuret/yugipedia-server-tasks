import { createBaseLogger } from './helpers';
import {
  type IBaseLogger,
  type ILogger,
  type ILoggerConstructorOptions,
  type ILoggerFactoryOptions,
} from './types';

class Logger implements ILogger {
  readonly #label: string;

  readonly #baseLogger: IBaseLogger;

  protected constructor({ baseLogger, label }: ILoggerConstructorOptions) {
    this.#baseLogger = baseLogger;

    this.#label = label;
  }

  static create({ isDebug, srcDirname, label }: ILoggerFactoryOptions): ILogger {
    return new Logger({
      baseLogger: createBaseLogger({ isDebug, srcDirname }),
      label,
    });
  }

  debug(...message: unknown[]): this {
    this.#baseLogger.debug({ message, label: this.#label });

    return this;
  }

  info(...message: unknown[]): this {
    this.#baseLogger.info({ message, label: this.#label });

    return this;
  }

  warn(...message: unknown[]): this {
    this.#baseLogger.warn({ message, label: this.#label });

    return this;
  }

  error(...message: unknown[]): this {
    this.#baseLogger.error({ message, label: this.#label });

    return this;
  }
}

export default Logger;
