import { type Channel, type SendableChannels } from 'discord.js';

interface IBaseLogger {
  debug(...messageParts: unknown[]): void;
  info(...messageParts: unknown[]): void;
  warn(...messageParts: unknown[]): void;
  error(...messageParts: unknown[]): void;
}

interface IDiscordClient {
  initiate(token: string): Promise<unknown>;
  getChannelById(channelId: string): Promise<Channel>;
  terminate(): Promise<void>;
}

interface IDiscordLoggerState {
  initiate(token: string): Promise<void>;
  info(...messageParts: unknown[]): void;
  warn(...messageParts: unknown[]): void;
  error(...messageParts: unknown[]): void;
  terminate(): Promise<void>;
}

interface IReadyStateConstructorOptions {
  channel: SendableChannels;
}

interface IDiscordLoggerInternals {
  getChannelId(): string;
  getDiscordClient(): IDiscordClient;
  getLabel(): string;
  setState(state: IDiscordLoggerState): this;
  getState(): IDiscordLoggerState;
}

interface IDiscordLoggerInternalsConstructorOptions {
  label: string;
  channelId: string;
}

interface IDiscordLogger {
  initiate(token: string): Promise<void>;
  debug(...messageParts: unknown[]): void;
  info(...messageParts: unknown[]): void;
  warn(...messageParts: unknown[]): void;
  error(...messageParts: unknown[]): void;
  terminate(): Promise<void>;
}

interface IDiscordLoggerConstructorOptions extends IDiscordLoggerInternalsConstructorOptions {
  baseLogger?: IBaseLogger;
}

export type {
  IBaseLogger,
  IDiscordClient,
  IDiscordLogger,
  IDiscordLoggerConstructorOptions,
  IDiscordLoggerInternals,
  IDiscordLoggerInternalsConstructorOptions,
  IDiscordLoggerState,
  IReadyStateConstructorOptions,
};
