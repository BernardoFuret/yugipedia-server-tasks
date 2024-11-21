import { type SendableChannels } from 'discord.js';
import { describe, expect, it, vi } from 'vitest';

import ReadyState from '../ReadyState';
import { type IDiscordLoggerInternals, type ISendableChannel } from '../types';

const fakeLabel = 'fakeLabel';

const fakeArgs = ['fake', 'args'];

describe('ReadyState', () => {
  it('logs an info message', () => {
    const fakeDiscorLoggerInternals: IDiscordLoggerInternals = {
      getChannelId: vi.fn(),
      getDiscordClient: vi.fn(),
      getLabel: vi.fn().mockReturnValue(fakeLabel),
      setState: vi.fn(),
      getState: vi.fn(),
    };

    const mockedSend = vi.fn();

    const fakeChannel: ISendableChannel = {
      isSendable: (): this is SendableChannels => true,
      send: mockedSend,
    };

    const readyState = new ReadyState(fakeDiscorLoggerInternals, {
      channel: fakeChannel,
    });

    readyState.info(...fakeArgs);

    expect(mockedSend).toHaveBeenCalledTimes(1);

    expect(mockedSend).toHaveBeenCalledWith({
      embeds: [expect.any(Object)],
    });
  });

  it('logs a warn message', () => {
    const fakeDiscorLoggerInternals: IDiscordLoggerInternals = {
      getChannelId: vi.fn(),
      getDiscordClient: vi.fn(),
      getLabel: vi.fn().mockReturnValue(fakeLabel),
      setState: vi.fn(),
      getState: vi.fn(),
    };

    const mockedSend = vi.fn();

    const fakeChannel: ISendableChannel = {
      isSendable: (): this is SendableChannels => true,
      send: mockedSend,
    };

    const readyState = new ReadyState(fakeDiscorLoggerInternals, {
      channel: fakeChannel,
    });

    readyState.warn(...fakeArgs);

    expect(mockedSend).toHaveBeenCalledTimes(1);

    expect(mockedSend).toHaveBeenCalledWith({
      embeds: [expect.any(Object)],
    });
  });

  it('logs an error message', () => {
    const fakeDiscorLoggerInternals: IDiscordLoggerInternals = {
      getChannelId: vi.fn(),
      getDiscordClient: vi.fn(),
      getLabel: vi.fn().mockReturnValue(fakeLabel),
      setState: vi.fn(),
      getState: vi.fn(),
    };

    const mockedSend = vi.fn();

    const fakeChannel: ISendableChannel = {
      isSendable: (): this is SendableChannels => true,
      send: mockedSend,
    };

    const readyState = new ReadyState(fakeDiscorLoggerInternals, {
      channel: fakeChannel,
    });

    readyState.error(...fakeArgs);

    expect(mockedSend).toHaveBeenCalledTimes(1);

    expect(mockedSend).toHaveBeenCalledWith({
      embeds: [expect.any(Object)],
    });
  });

  it('terminates', async () => {
    const mockedTerminate = vi.fn();

    const fakeDiscorLoggerInternals: IDiscordLoggerInternals = {
      getChannelId: vi.fn(),
      getDiscordClient: vi.fn().mockReturnValue({
        terminate: mockedTerminate,
      }),
      getLabel: vi.fn(),
      setState: vi.fn(),
      getState: vi.fn(),
    };

    const fakeChannel: ISendableChannel = {
      isSendable: (): this is SendableChannels => true,
      send: vi.fn(),
    };

    const readyState = new ReadyState(fakeDiscorLoggerInternals, {
      channel: fakeChannel,
    });

    await readyState.terminate();

    expect(mockedTerminate).toHaveBeenCalledTimes(1);
  });

  it('throws an error if it tries to initiate', async () => {
    const fakeDiscorLoggerInternals: IDiscordLoggerInternals = {
      getChannelId: vi.fn(),
      getDiscordClient: vi.fn(),
      getLabel: vi.fn(),
      setState: vi.fn(),
      getState: vi.fn(),
    };

    const fakeChannel: ISendableChannel = {
      isSendable: (): this is SendableChannels => true,
      send: vi.fn(),
    };

    const readyState = new ReadyState(fakeDiscorLoggerInternals, {
      channel: fakeChannel,
    });

    await expect(() => readyState.initiate()).rejects.toThrow('is already initialized');
  });
});
