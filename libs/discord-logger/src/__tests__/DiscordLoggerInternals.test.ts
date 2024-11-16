import { afterEach, describe, expect, it, vi } from 'vitest';

import DiscordLoggerInternals from '../DiscordLoggerInternals';
import { type IDiscordClient, type IDiscordLoggerState } from '../types';

const mockedDiscordClient = vi.fn();

vi.mock(import('../DiscordClient'), () => ({
  get default() {
    return mockedDiscordClient;
  },
}));

const mockedInitialState = vi.fn();

vi.mock(import('../InitialState'), () => ({
  get default() {
    return mockedInitialState;
  },
}));

const fakeLabel = 'fakeLabel';

const fakeChannelId = 'fakeChannelId';

const fakeDiscordClient: IDiscordClient = {
  initiate: vi.fn(),
  getChannelById: vi.fn(),
  terminate: vi.fn(),
};

const fakeInitialState: IDiscordLoggerState = {
  initiate: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  terminate: vi.fn(),
};

describe('DiscordLoggerInternals', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('creates an instance with the expected members', () => {
    mockedDiscordClient.mockImplementation(() => fakeDiscordClient);

    mockedInitialState.mockImplementation(() => fakeInitialState);

    const discordLoggerInternals = new DiscordLoggerInternals({
      label: fakeLabel,
      channelId: fakeChannelId,
    });

    expect(discordLoggerInternals.getChannelId()).toBe(fakeChannelId);

    expect(discordLoggerInternals.getDiscordClient()).toBe(fakeDiscordClient);

    expect(discordLoggerInternals.getLabel()).toBe(fakeLabel);

    expect(discordLoggerInternals.getState()).toBe(fakeInitialState);
  });

  it('updates state', () => {
    mockedInitialState.mockImplementation(() => fakeInitialState);

    const discordLoggerInternals = new DiscordLoggerInternals({
      label: fakeLabel,
      channelId: fakeChannelId,
    });

    expect(discordLoggerInternals.getState()).toBe(fakeInitialState);

    const newFakeState: IDiscordLoggerState = {
      initiate: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      terminate: vi.fn(),
    };

    discordLoggerInternals.setState(newFakeState);

    expect(discordLoggerInternals.getState()).toBe(newFakeState);
  });
});
