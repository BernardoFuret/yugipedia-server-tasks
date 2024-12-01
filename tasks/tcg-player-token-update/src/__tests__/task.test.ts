import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type IDiscordLogger } from '@libs/discord-logger';

import task from '../task';

const { mockedConfigGetter, mockedWriteFile, mockedReadFile } = vi.hoisted(() => ({
  mockedConfigGetter: vi.fn(),

  mockedWriteFile: vi.fn(),

  mockedReadFile: vi.fn(),
}));

vi.mock('node:fs/promises', () => ({
  get readFile() {
    return mockedReadFile;
  },
  get writeFile() {
    return mockedWriteFile;
  },
}));

vi.mock(import('../config'), () => ({
  get default() {
    return mockedConfigGetter();
  },
}));

describe('Task', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('fetches the access token', async () => {
    vi.setSystemTime(new Date(2024, 11, 12, 12, 12, 12, 12));

    const fakePath = 'fake/path';

    const spyOnSchemaSafeParse = mockedConfigGetter.mockReturnValue({
      isDebug: false,

      discord: {
        botToken: '',
        logChannelId: '',
      },

      tcgplayer: {
        apiUrl: '',
        clientId: '',
        clientSecret: '',
      },

      tcgplayerExtension: {
        configFilePath: fakePath,
      },
    });

    const fakeAccessToken = 'fakeAccessToken';

    const spyOnfetch = vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          access_token: fakeAccessToken,
        }),
      ),
    );

    mockedReadFile.mockResolvedValue(
      "\n$tcgplayerConfigBearerToken = 'fakeInitialToken'; // Last updated at: 2011-11-11T11:11.111Z\n",
    );

    const mockedDiscordLoggerInfo = vi.fn();

    const fakeDiscordLogger: IDiscordLogger = {
      initiate: vi.fn(),
      debug: vi.fn(),
      info: mockedDiscordLoggerInfo,
      warn: vi.fn(),
      error: vi.fn(),
      terminate: vi.fn(),
    };

    await task(fakeDiscordLogger);

    expect(spyOnfetch).toHaveBeenCalledOnce();

    expect(mockedReadFile).toHaveBeenCalledOnce();

    expect(mockedReadFile).toHaveBeenCalledWith(fakePath, 'utf8');

    expect(mockedWriteFile).toHaveBeenCalledOnce();

    expect(mockedWriteFile).toHaveBeenCalledWith(
      fakePath,
      expect.stringMatching(new RegExp(fakeAccessToken)),
    );

    expect(mockedDiscordLoggerInfo).toHaveBeenCalledOnce();

    spyOnfetch.mockRestore();

    spyOnSchemaSafeParse.mockRestore();
  });
});
