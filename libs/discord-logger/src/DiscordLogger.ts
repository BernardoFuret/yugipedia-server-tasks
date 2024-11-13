import DiscordLoggerInternals from './DiscordLoggerInternals';
import {
  type IBaseLogger,
  type IDiscordLogger,
  type IDiscordLoggerConstructorOptions,
  type IDiscordLoggerInternals,
  type IDiscordLoggerState,
} from './types';

class DiscordLogger implements IDiscordLogger {
  readonly #baseLogger?: IBaseLogger;

  readonly #internals: IDiscordLoggerInternals;

  constructor({ baseLogger, label, channelId }: IDiscordLoggerConstructorOptions) {
    this.#baseLogger = baseLogger;

    this.#internals = new DiscordLoggerInternals({ label, channelId });
  }

  get #state(): IDiscordLoggerState {
    return this.#internals.getState();
  }

  async initiate(token: string): Promise<void> {
    return this.#state.initiate(token);
  }

  debug(...args: unknown[]): void {
    this.#baseLogger?.debug(...args);
  }

  info(...args: unknown[]): void {
    this.#baseLogger?.info(...args);

    this.#state.info(...args);
  }

  warn(...args: unknown[]): void {
    this.#baseLogger?.warn(...args);

    this.#state.warn(...args);
  }

  error(...args: unknown[]): void {
    this.#baseLogger?.error(...args);

    this.#state.error(...args);
  }

  async terminate(): Promise<void> {
    return this.#state.terminate();
  }
}

export default DiscordLogger;
