import { type APIEmbed, Colors, EmbedBuilder, type SendableChannels } from 'discord.js';

import { formatToPrint, wrapMessageData } from './helpers';
import {
  type IDiscordLoggerInternals,
  type IDiscordLoggerState,
  type IReadyStateConstructorOptions,
} from './types';

class ReadyState implements IDiscordLoggerState {
  readonly #discordLoggerInternals: IDiscordLoggerInternals;

  readonly #channel: SendableChannels;

  constructor(
    discordLoggerInternals: IDiscordLoggerInternals,
    { channel }: IReadyStateConstructorOptions,
  ) {
    this.#discordLoggerInternals = discordLoggerInternals;

    this.#channel = channel;
  }

  #createEmbedPayload(color: number, args: unknown[]): { embeds: [APIEmbed] } {
    return {
      embeds: [
        new EmbedBuilder()
          .setColor(color)
          .setTitle(this.#discordLoggerInternals.getLabel())
          .setDescription(wrapMessageData(formatToPrint(args)))
          .setTimestamp()
          .toJSON(),
      ],
    };
  }

  async initiate(): Promise<void> {
    throw new Error(`${this.#discordLoggerInternals.constructor.name} is already initialized`);
  }

  info(...args: unknown[]): void {
    this.#channel.send(this.#createEmbedPayload(Colors.DarkGreen, args));
  }

  warn(...args: unknown[]): void {
    this.#channel.send(this.#createEmbedPayload(Colors.DarkGold, args));
  }

  error(...args: unknown[]): void {
    this.#channel.send(this.#createEmbedPayload(Colors.DarkRed, args));
  }

  async terminate(): Promise<void> {
    const discordClient = this.#discordLoggerInternals.getDiscordClient();

    return discordClient.terminate();
  }
}

export default ReadyState;
