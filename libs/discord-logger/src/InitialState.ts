import ReadyState from './ReadyState';
import { type IDiscordLogger, type IDiscordLoggerState } from './types';

class InitialState implements IDiscordLoggerState {
  readonly #discordLogger: IDiscordLogger;

  constructor(discordLogger: IDiscordLogger) {
    this.#discordLogger = discordLogger;
  }

  async initiate(token: string): Promise<void> {
    const discordClient = this.#discordLogger.getDiscordClient();

    await discordClient.initiate(token);

    const channelId = this.#discordLogger.getChannelId();

    const channel = await discordClient.getChannelById(channelId);

    if (!channel.isSendable()) {
      throw new Error(`Channel with ID ${channelId} is not sendable`, {
        cause: { channelId, channel },
      });
    }

    this.#discordLogger.setState(new ReadyState(this.#discordLogger, { channel }));
  }

  info(): void {
    throw new Error(`${this.#discordLogger.constructor.name} is not initialized yet`);
  }

  warn(): void {
    throw new Error(`${this.#discordLogger.constructor.name} is not initialized yet`);
  }

  error(): void {
    throw new Error(`${this.#discordLogger.constructor.name} is not initialized yet`);
  }

  async terminate(): Promise<void> {
    throw new Error(`${this.#discordLogger.constructor.name} is not initialized yet`);
  }
}

export default InitialState;
