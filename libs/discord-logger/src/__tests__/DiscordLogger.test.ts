import { ChannelManager, Client, type SendableChannels } from 'discord.js';
import { afterAll, describe, expect, it, vi } from 'vitest';

import DiscordLogger from '../DiscordLogger';
import InitialState from '../InitialState';
import ReadyState from '../ReadyState';
import { type IBaseLogger } from '../types';

const fakeLabel = 'fakeLabel';

const fakeChannelId = 'fakeChannelId';

const fakeToken = 'fakeToken';

const fakeArgs = ['fake', 'args'];

describe('DiscordLogger', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('initiates the logger, logs messages and terminates successfully', async () => {
    /**
     * Arrange
     */

    // Discord.js spies

    const spyOnClientPrototypeLogin = vi
      .spyOn(Client.prototype, 'login')
      .mockImplementation(async () => '');

    const spyOnClientPrototypeOnce = vi
      .spyOn(Client.prototype, 'once')
      .mockImplementation((_event, fn) => {
        fn();

        return Client.prototype;
      });

    const mockedChannelPrototypeSend = vi.fn();

    const spyOnChannelManagerPrototypeFetch = vi
      .spyOn(ChannelManager.prototype, 'fetch')
      // @ts-expect-error Only these two methods are needed.
      .mockResolvedValue({
        isSendable: (): this is SendableChannels => true,
        send: mockedChannelPrototypeSend,
      });

    const spyOnClientPrototypeTerminate = vi
      .spyOn(Client.prototype, 'destroy')
      .mockImplementation(async () => {});

    // InitialState spies

    const spyOnInitialStatePrototypeInitiate = vi.spyOn(InitialState.prototype, 'initiate');

    const spyOnInitialStatePrototypeInfo = vi.spyOn(InitialState.prototype, 'info');

    const spyOnInitialStatePrototypeWarn = vi.spyOn(InitialState.prototype, 'warn');

    const spyOnInitialStatePrototypeError = vi.spyOn(InitialState.prototype, 'error');

    const spyOnInitialStatePrototypeTerminate = vi.spyOn(InitialState.prototype, 'terminate');

    // ReadyState spies

    const spyOnReadyStatePrototypeInitiate = vi.spyOn(ReadyState.prototype, 'initiate');

    const spyOnReadyStatePrototypeInfo = vi.spyOn(ReadyState.prototype, 'info');

    const spyOnReadyStatePrototypeWarn = vi.spyOn(ReadyState.prototype, 'warn');

    const spyOnReadyStatePrototypeError = vi.spyOn(ReadyState.prototype, 'error');

    const spyOnReadyStatePrototypeTerminate = vi.spyOn(ReadyState.prototype, 'terminate');

    // Mocks

    const mockedBaseLoggerDebug = vi.fn();

    const mockedBaseLoggerInfo = vi.fn();

    const mockedBaseLoggerWarn = vi.fn();

    const mockedBaseLoggerError = vi.fn();

    const fakeBaseLogger: IBaseLogger = {
      debug: mockedBaseLoggerDebug,
      info: mockedBaseLoggerInfo,
      warn: mockedBaseLoggerWarn,
      error: mockedBaseLoggerError,
    };

    /**
     * Act and assert
     */

    const discordLogger = new DiscordLogger({
      baseLogger: fakeBaseLogger,
      label: fakeLabel,
      channelId: fakeChannelId,
    });

    await discordLogger.initiate(fakeToken);

    expect(spyOnInitialStatePrototypeInitiate).toHaveBeenCalledTimes(1);

    expect(spyOnReadyStatePrototypeInitiate).not.toHaveBeenCalled();

    expect(spyOnClientPrototypeLogin).toHaveBeenCalled();

    expect(spyOnClientPrototypeOnce).toHaveBeenCalled();

    expect(spyOnChannelManagerPrototypeFetch).toHaveBeenCalled();

    discordLogger.debug(...fakeArgs);

    expect(mockedBaseLoggerDebug).toHaveBeenCalledTimes(1);

    expect(mockedBaseLoggerDebug).toHaveBeenCalledWith(...fakeArgs);

    discordLogger.info(...fakeArgs);

    expect(mockedBaseLoggerInfo).toHaveBeenCalledTimes(1);

    expect(mockedBaseLoggerInfo).toHaveBeenCalledWith(...fakeArgs);

    expect(mockedChannelPrototypeSend).toHaveBeenCalledTimes(1);

    expect(mockedChannelPrototypeSend).toHaveBeenNthCalledWith(1, {
      embeds: [expect.any(Object)],
    });

    expect(spyOnInitialStatePrototypeInfo).not.toHaveBeenCalled();

    expect(spyOnReadyStatePrototypeInfo).toHaveBeenCalledTimes(1);

    expect(spyOnReadyStatePrototypeInfo).toHaveBeenCalledWith(...fakeArgs);

    discordLogger.warn(...fakeArgs);

    expect(mockedBaseLoggerWarn).toHaveBeenCalledTimes(1);

    expect(mockedBaseLoggerWarn).toHaveBeenCalledWith(...fakeArgs);

    expect(mockedChannelPrototypeSend).toHaveBeenCalledTimes(2);

    expect(mockedChannelPrototypeSend).toHaveBeenNthCalledWith(2, {
      embeds: [expect.any(Object)],
    });

    expect(spyOnInitialStatePrototypeWarn).not.toHaveBeenCalled();

    expect(spyOnReadyStatePrototypeWarn).toHaveBeenCalledTimes(1);

    expect(spyOnReadyStatePrototypeWarn).toHaveBeenCalledWith(...fakeArgs);

    discordLogger.error(...fakeArgs);

    expect(mockedBaseLoggerError).toHaveBeenCalledTimes(1);

    expect(mockedBaseLoggerError).toHaveBeenCalledWith(...fakeArgs);

    expect(mockedChannelPrototypeSend).toHaveBeenCalledTimes(3);

    expect(mockedChannelPrototypeSend).toHaveBeenNthCalledWith(3, {
      embeds: [expect.any(Object)],
    });

    expect(spyOnInitialStatePrototypeError).not.toHaveBeenCalled();

    expect(spyOnReadyStatePrototypeError).toHaveBeenCalledTimes(1);

    expect(spyOnReadyStatePrototypeError).toHaveBeenCalledWith(...fakeArgs);

    await discordLogger.terminate();

    expect(spyOnInitialStatePrototypeTerminate).not.toHaveBeenCalled();

    expect(spyOnReadyStatePrototypeTerminate).toHaveBeenCalledTimes(1);

    expect(spyOnClientPrototypeTerminate).toHaveBeenCalledTimes(1);
  });

  it('throws an error if it tries to initiate multiple times', async () => {
    /**
     * Arrange
     */

    // Discord.js spies

    const spyOnClientPrototypeLogin = vi
      .spyOn(Client.prototype, 'login')
      .mockImplementation(async () => '');

    const spyOnClientPrototypeOnce = vi
      .spyOn(Client.prototype, 'once')
      .mockImplementation((_event, fn) => {
        fn();

        return Client.prototype;
      });

    const spyOnChannelManagerPrototypeFetch = vi
      .spyOn(ChannelManager.prototype, 'fetch')
      // @ts-expect-error Only these two methods are needed.
      .mockResolvedValue({
        isSendable: (): this is SendableChannels => true,
        send: vi.fn(),
      });

    const spyOnClientPrototypeTerminate = vi
      .spyOn(Client.prototype, 'destroy')
      .mockImplementation(async () => {});

    // InitialState spies

    const spyOnInitialStatePrototypeInitiate = vi.spyOn(InitialState.prototype, 'initiate');

    const spyOnInitialStatePrototypeTerminate = vi.spyOn(InitialState.prototype, 'terminate');

    // ReadyState spies

    const spyOnReadyStatePrototypeInitiate = vi.spyOn(ReadyState.prototype, 'initiate');

    const spyOnReadyStatePrototypeTerminate = vi.spyOn(ReadyState.prototype, 'terminate');

    /**
     * Act and assert
     */

    const discordLogger = new DiscordLogger({
      label: fakeLabel,
      channelId: fakeChannelId,
    });

    await discordLogger.initiate(fakeToken);

    await expect(() => discordLogger.initiate(fakeToken)).rejects.toThrow('is already initialized');

    expect(spyOnInitialStatePrototypeInitiate).toHaveBeenCalledTimes(1);

    expect(spyOnReadyStatePrototypeInitiate).toHaveBeenCalledTimes(1);

    expect(spyOnClientPrototypeLogin).toHaveBeenCalled();

    expect(spyOnClientPrototypeOnce).toHaveBeenCalled();

    expect(spyOnChannelManagerPrototypeFetch).toHaveBeenCalled();

    await discordLogger.terminate();

    expect(spyOnInitialStatePrototypeTerminate).not.toHaveBeenCalled();

    expect(spyOnReadyStatePrototypeTerminate).toHaveBeenCalledTimes(1);

    expect(spyOnClientPrototypeTerminate).toHaveBeenCalledTimes(1);
  });

  it('throws an error if it tries to log before initiating', async () => {
    /**
     * Arrange
     */

    // InitialState spies

    const spyOnInitialStatePrototypeInfo = vi.spyOn(InitialState.prototype, 'info');

    const spyOnInitialStatePrototypeWarn = vi.spyOn(InitialState.prototype, 'warn');

    const spyOnInitialStatePrototypeError = vi.spyOn(InitialState.prototype, 'error');

    // ReadyState spies

    const spyOnReadyStatePrototypeInfo = vi.spyOn(ReadyState.prototype, 'info');

    const spyOnReadyStatePrototypeWarn = vi.spyOn(ReadyState.prototype, 'warn');

    const spyOnReadyStatePrototypeError = vi.spyOn(ReadyState.prototype, 'error');

    // Mocks

    const mockedBaseLoggerDebug = vi.fn();

    const mockedBaseLoggerInfo = vi.fn();

    const mockedBaseLoggerWarn = vi.fn();

    const mockedBaseLoggerError = vi.fn();

    const fakeBaseLogger: IBaseLogger = {
      debug: mockedBaseLoggerDebug,
      info: mockedBaseLoggerInfo,
      warn: mockedBaseLoggerWarn,
      error: mockedBaseLoggerError,
    };

    /**
     * Act and assert
     */

    const discordLogger = new DiscordLogger({
      baseLogger: fakeBaseLogger,
      label: fakeLabel,
      channelId: fakeChannelId,
    });

    expect(() => discordLogger.info(...fakeArgs)).toThrow('is not initialized yet');

    expect(mockedBaseLoggerInfo).toHaveBeenCalledTimes(1);

    expect(mockedBaseLoggerInfo).toHaveBeenCalledWith(...fakeArgs);

    expect(spyOnInitialStatePrototypeInfo).toHaveBeenCalledTimes(1);

    expect(spyOnInitialStatePrototypeInfo).toHaveBeenCalledWith(...fakeArgs);

    expect(spyOnReadyStatePrototypeInfo).not.toHaveBeenCalled();

    expect(() => discordLogger.warn(...fakeArgs)).toThrow('is not initialized yet');

    expect(mockedBaseLoggerWarn).toHaveBeenCalledTimes(1);

    expect(mockedBaseLoggerWarn).toHaveBeenCalledWith(...fakeArgs);

    expect(spyOnInitialStatePrototypeWarn).toHaveBeenCalledTimes(1);

    expect(spyOnInitialStatePrototypeWarn).toHaveBeenCalledWith(...fakeArgs);

    expect(spyOnReadyStatePrototypeWarn).not.toHaveBeenCalled();

    expect(() => discordLogger.error(...fakeArgs)).toThrow('is not initialized yet');

    expect(mockedBaseLoggerError).toHaveBeenCalledTimes(1);

    expect(mockedBaseLoggerError).toHaveBeenCalledWith(...fakeArgs);

    expect(spyOnReadyStatePrototypeError).not.toHaveBeenCalled();

    expect(spyOnInitialStatePrototypeError).toHaveBeenCalledTimes(1);

    expect(spyOnInitialStatePrototypeError).toHaveBeenCalledWith(...fakeArgs);
  });

  it('throws an error if it tries to terminate before initiating', async () => {
    /**
     * Arrange
     */

    // InitialState spies

    const spyOnInitialStatePrototypeTerminate = vi.spyOn(InitialState.prototype, 'terminate');

    // ReadyState spies

    const spyOnReadyStatePrototypeTerminate = vi.spyOn(ReadyState.prototype, 'terminate');

    /**
     * Act and assert
     */

    const discordLogger = new DiscordLogger({
      label: fakeLabel,
      channelId: fakeChannelId,
    });

    await expect(() => discordLogger.terminate()).rejects.toThrow('is not initialized yet');

    expect(spyOnInitialStatePrototypeTerminate).toHaveBeenCalledTimes(1);

    expect(spyOnReadyStatePrototypeTerminate).not.toHaveBeenCalled();
  });
});
