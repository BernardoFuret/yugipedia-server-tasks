import { afterEach, describe, expect, it, vi } from 'vitest';

import InitialState from '../InitialState';
import { type IDiscordClient } from '../types';

const mockedReadyState = vi.fn();

vi.mock(import('../ReadyState'), () => ({
  get default() {
    return mockedReadyState;
  },
}));

describe('InitialState', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('initiates the Discord Logger and updates state', async () => {
    const fakeChannel = {
      isSendable: () => true,
    };

    const fakeDiscordClient: IDiscordClient = {
      initiate: vi.fn(),
      getChannelById: vi.fn().mockResolvedValue(fakeChannel),
      terminate: vi.fn(),
    };

    const mockedDiscordLoggerInternalsPrototypeSetState = vi.fn();

    const fakeDiscorLoggerInternals = {
      getChannelId: vi.fn(),
      getDiscordClient: vi.fn().mockReturnValue(fakeDiscordClient),
      getLabel: vi.fn(),
      setState: mockedDiscordLoggerInternalsPrototypeSetState,
      getState: vi.fn(),
    };

    const initialState = new InitialState(fakeDiscorLoggerInternals);

    await initialState.initiate('fakeToken');

    expect(mockedDiscordLoggerInternalsPrototypeSetState).toHaveBeenCalledTimes(1);

    expect(mockedReadyState).toHaveBeenCalledTimes(1);

    expect(mockedReadyState).toHaveBeenCalledWith(fakeDiscorLoggerInternals, {
      channel: fakeChannel,
    });
  });

  it('throws an error if it tries to initiate the Discord Logger but the Channel ID passed is for a non-sendable Channel', async () => {
    const fakeChannel = {
      isSendable: () => false,
    };

    const fakeDiscordClient: IDiscordClient = {
      initiate: vi.fn(),
      getChannelById: vi.fn().mockResolvedValue(fakeChannel),
      terminate: vi.fn(),
    };

    const mockedDiscordLoggerInternalsPrototypeSetState = vi.fn();

    const fakeDiscorLoggerInternals = {
      getChannelId: vi.fn(),
      getDiscordClient: vi.fn().mockReturnValue(fakeDiscordClient),
      getLabel: vi.fn(),
      setState: mockedDiscordLoggerInternalsPrototypeSetState,
      getState: vi.fn(),
    };

    const initialState = new InitialState(fakeDiscorLoggerInternals);

    await expect(() => initialState.initiate('fakeToken')).rejects.toThrow('is not sendable');

    expect(mockedDiscordLoggerInternalsPrototypeSetState).not.toHaveBeenCalled();

    expect(mockedReadyState).not.toHaveBeenCalled();
  });

  it('throws if it tries to log an info message', () => {
    const initialState = new InitialState({
      getChannelId: vi.fn(),
      getDiscordClient: vi.fn(),
      getLabel: vi.fn(),
      setState: vi.fn(),
      getState: vi.fn(),
    });

    expect(() => initialState.info()).toThrow('is not initialized yet');
  });

  it('throws if it tries to log a warn message', () => {
    const initialState = new InitialState({
      getChannelId: vi.fn(),
      getDiscordClient: vi.fn(),
      getLabel: vi.fn(),
      setState: vi.fn(),
      getState: vi.fn(),
    });

    expect(() => initialState.warn()).toThrow('is not initialized yet');
  });

  it('throws if it tries to log an error message', () => {
    const initialState = new InitialState({
      getChannelId: vi.fn(),
      getDiscordClient: vi.fn(),
      getLabel: vi.fn(),
      setState: vi.fn(),
      getState: vi.fn(),
    });

    expect(() => initialState.error()).toThrow('is not initialized yet');
  });

  it('throws if it tries to terminate', async () => {
    const initialState = new InitialState({
      getChannelId: vi.fn(),
      getDiscordClient: vi.fn(),
      getLabel: vi.fn(),
      setState: vi.fn(),
      getState: vi.fn(),
    });

    await expect(() => initialState.terminate()).rejects.toThrow('is not initialized yet');
  });
});
