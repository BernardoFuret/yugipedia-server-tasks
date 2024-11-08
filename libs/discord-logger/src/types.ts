import { type Channel, type SendableChannels } from 'discord.js';

import { type ILogger } from '@libs/logger'; // TODO

interface IDiscordClient {
  start(token: string): Promise<unknown>;
  getChannelById(channelId: string): Promise<Channel>;
  terminate(): Promise<void>;
}

interface IDiscordLoggerState {
  init(token: string): Promise<void>;
  info(...messageParts: unknown[]): void;
  warn(...messageParts: unknown[]): void;
  error(...messageParts: unknown[]): void;
}

interface IReadyStateConstructorOptions {
  channel: SendableChannels;
}

interface IDiscordLogger {
  getChannelId(): string;
  getDiscordClient(): IDiscordClient;
  getLabel(): string;
  setState(state: IDiscordLoggerState): this;
  init(token: string): Promise<void>;
  debug(...messageParts: unknown[]): void;
  info(...messageParts: unknown[]): void;
  warn(...messageParts: unknown[]): void;
  error(...messageParts: unknown[]): void;
}

interface IDiscordLoggerConstructorOptions {
  baseLogger?: ILogger;
  label: string;
  channelId: string;
}

export type {
  IDiscordClient,
  IDiscordLogger,
  IDiscordLoggerConstructorOptions,
  IDiscordLoggerState,
  IReadyStateConstructorOptions,
};
