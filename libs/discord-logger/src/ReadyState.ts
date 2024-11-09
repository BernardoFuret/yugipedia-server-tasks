import { type APIEmbed, Colors, type SendableChannels } from 'discord.js';

import {
  type IDiscordLogger,
  type IDiscordLoggerState,
  type IReadyStateConstructorOptions,
} from './types';

const getDateString = () => new Date().toISOString();

function formatToPrint(args: unknown[]) {
  return args
    .map((arg) => {
      if (typeof arg === 'string') {
        return arg;
      }

      return arg instanceof Error
        ? `${arg}\n${'```\n'}${arg.message}\n\n${arg.cause || ''}${'```'}`
        : `${'```JSON\n'}${JSON.stringify(arg)}${'```'}`;
    })
    .join(' ')
    .substring(0, 2000);
}

class ReadyState implements IDiscordLoggerState {
  readonly #discordLogger: IDiscordLogger;

  readonly #channel: SendableChannels;

  constructor(discordLogger: IDiscordLogger, { channel }: IReadyStateConstructorOptions) {
    this.#discordLogger = discordLogger;

    this.#channel = channel;
  }

  #createEmbedPayload(color: number, args: unknown[]): { embeds: [APIEmbed] } {
    return {
      embeds: [
        {
          title: this.#discordLogger.getLabel(),
          description: formatToPrint(args),
          color,
          timestamp: getDateString(),
        },
      ],
    };
  }

  async initiate(): Promise<void> {
    throw new Error(`${this.#discordLogger.constructor.name} is already initialized`);
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
    const discordClient = this.#discordLogger.getDiscordClient();

    return discordClient.terminate();
  }
}

export default ReadyState;
