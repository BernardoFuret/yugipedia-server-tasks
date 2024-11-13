import ReadyState from './ReadyState';
import { type IDiscordLoggerInternals, type IDiscordLoggerState } from './types';

class InitialState implements IDiscordLoggerState {
  readonly #discordLoggerInternals: IDiscordLoggerInternals;

  constructor(discordLoggerInternals: IDiscordLoggerInternals) {
    this.#discordLoggerInternals = discordLoggerInternals;
  }

  async initiate(token: string): Promise<void> {
    const discordClient = this.#discordLoggerInternals.getDiscordClient();

    await discordClient.initiate(token);

    const channelId = this.#discordLoggerInternals.getChannelId();

    const channel = await discordClient.getChannelById(channelId);

    if (!channel.isSendable()) {
      throw new Error(`Channel with ID ${channelId} is not sendable`, {
        cause: { channelId, channel },
      });
    }

    this.#discordLoggerInternals.setState(
      new ReadyState(this.#discordLoggerInternals, { channel }),
    );
  }

  info(): void {
    throw new Error(`${this.#discordLoggerInternals.constructor.name} is not initialized yet`);
  }

  warn(): void {
    throw new Error(`${this.#discordLoggerInternals.constructor.name} is not initialized yet`);
  }

  error(): void {
    throw new Error(`${this.#discordLoggerInternals.constructor.name} is not initialized yet`);
  }

  async terminate(): Promise<void> {
    throw new Error(`${this.#discordLoggerInternals.constructor.name} is not initialized yet`);
  }
}

export default InitialState;
