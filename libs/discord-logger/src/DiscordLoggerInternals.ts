import DiscordClient from './DiscordClient';
import InitialState from './InitialState';
import {
  type IDiscordClient,
  type IDiscordLoggerInternals,
  type IDiscordLoggerInternalsConstructorOptions,
  type IDiscordLoggerState,
} from './types';

class DiscordLoggerInternals implements IDiscordLoggerInternals {
  readonly #label: string;

  readonly #channelId: string;

  readonly #discordClient: IDiscordClient;

  #state: IDiscordLoggerState;

  constructor({ label, channelId }: IDiscordLoggerInternalsConstructorOptions) {
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

  getState(): IDiscordLoggerState {
    return this.#state;
  }
}

export default DiscordLoggerInternals;
