import { describe, expect, it, vi } from 'vitest';

import DiscordLoggerInternals from '../DiscordLoggerInternals';
import InitialState from '../InitialState';
import { type IDiscordLoggerState } from '../types.ts';

const fakeLabel = 'fakeLabel';

const fakeChannelId = 'fakeChannelId';

describe('DiscordLoggerInternals', () => {
  it('creates an instance with the expected members', () => {
    const discordLoggerInternals = new DiscordLoggerInternals({
      label: fakeLabel,
      channelId: fakeChannelId,
    });

    expect(discordLoggerInternals.getChannelId()).toBe(fakeChannelId);

    expect(discordLoggerInternals.getDiscordClient()).toBeInstanceOf(DiscordLoggerInternals);

    expect(discordLoggerInternals.getLabel()).toBe(fakeLabel);

    expect(discordLoggerInternals.getState()).toBeInstanceOf(InitialState);
  });

  it('updates state', () => {
    const discordLoggerInternals = new DiscordLoggerInternals({
      label: fakeLabel,
      channelId: fakeChannelId,
    });

    expect(discordLoggerInternals.getState()).toBeInstanceOf(InitialState);

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
