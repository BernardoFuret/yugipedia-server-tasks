import { type ILogger } from '@libs/logger'; // TODO: check if dep can be removed

import DiscordClient from './DisordClient';
import InitialState from './InitialState';
import {
  type IDiscordClient,
  type IDiscordLogger,
  type IDiscordLoggerConstructorOptions,
  type IDiscordLoggerState,
} from './types';

class DiscordLogger implements IDiscordLogger {
  readonly #baseLogger?: ILogger;

  readonly #label: string;

  readonly #channelId: string;

  readonly #discordClient: IDiscordClient;

  #state: IDiscordLoggerState;

  constructor({ baseLogger, label, channelId }: IDiscordLoggerConstructorOptions) {
    this.#baseLogger = baseLogger; // TODO: #logger ???

    this.#label = label;

    this.#channelId = channelId;

    this.#discordClient = new DiscordClient();

    this.#state = new InitialState(this);
  }

  getChannelId(): string {
    return this.#channelId;
  }

  getDiscordClient(): IDiscordClient {
    return this.#discordClient;
  }

  getLabel(): string {
    return this.#label;
  }

  setState(state: IDiscordLoggerState): this {
    this.#state = state;

    return this;
  }

  async init(token: string): Promise<void> {
    return this.#state.init(token);
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
}

export default DiscordLogger;
