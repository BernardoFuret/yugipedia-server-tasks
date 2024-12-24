import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type IDiscordLogger } from '@libs/discord-logger';

import { type IConfig } from '../config/types';
import { SummoningCategories } from '../constants';
import task from '../task';
import { type ISmwGizmekUkaTarget } from '../yugipediaClient';

const { mockedConfigGetter, mockedWriteFile, mockedReadFile } = vi.hoisted(() => ({
  mockedConfigGetter: vi.fn<() => IConfig>(),

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

  it('fetches the Gizmek Uka targets data', async () => {
    vi.setSystemTime(new Date(2024, 11, 12, 12, 12, 12, 12));

    const fakePath = 'fake/path';

    const spyOnSchemaSafeParse = mockedConfigGetter.mockReturnValue({
      isDebug: false,

      discord: {
        botToken: '',
        logChannelId: '',
      },

      yugipedia: {
        apiUrl: '',
      },

      gizmekUkaTargetsExtension: {
        dataFilePath: fakePath,
      },
    });

    const pagename1Data: ISmwGizmekUkaTarget['query']['results']['printouts'] = {
      printouts: {
        ATK: [400],
        DEF: [400],
        Attribute: [{ fulltext: 'Attribute 1', fullurl: '' }],
        Type: [{ fulltext: 'Type 1', fullurl: '' }],
        'Stars string': ['4'],
        Summoning: [{ fulltext: '', fullurl: '' }],
        'Primary type': [{ fulltext: 'Primary type 1', fullurl: '' }],
      },
    };

    const pagename2Data: ISmwGizmekUkaTarget['query']['results']['printouts'] = {
      printouts: {
        ATK: [400],
        DEF: [400],
        Attribute: [{ fulltext: 'Attribute 1', fullurl: '' }],
        Type: [{ fulltext: 'Type 1', fullurl: '' }],
        'Stars string': ['4'],
        Summoning: [{ fulltext: SummoningCategories.NO_SPECIAL_SUMMON_FROM_DECK, fullurl: '' }],
        'Primary type': [{ fulltext: 'Primary type 1', fullurl: '' }],
      },
    };

    const fakeFetchResponse: ISmwGizmekUkaTarget = {
      query: {
        results: {
          pagename1: pagename1Data,
          pagename2: pagename2Data,
        },
      },
    };

    const spyOnfetch = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify(fakeFetchResponse)));

    mockedReadFile.mockResolvedValue(
      '\nconst YUGIPEDIA_DATA = []; // Last updated at: 2011-11-11T11:11.111Z\n',
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

    expect(mockedWriteFile).toHaveBeenCalledWith(fakePath, expect.any(String));

    expect(mockedWriteFile.mock.calls[0]?.[1]).toMatchInlineSnapshot(`
      "
      const YUGIPEDIA_DATA = [{"name":"pagename1","atkDef":400,"attribute":"Attribute 1","type":"Type 1","level":"4","ssFromDeck":true,"isNormalMonster":false},{"name":"pagename2","atkDef":400,"attribute":"Attribute 1","type":"Type 1","level":"4","ssFromDeck":false,"isNormalMonster":false}]; // Last updated at: 2024-12-12T12:12:12.012Z
      "
    `);

    expect(mockedDiscordLoggerInfo).toHaveBeenCalledOnce();

    spyOnfetch.mockRestore();

    spyOnSchemaSafeParse.mockRestore();
  });
});
