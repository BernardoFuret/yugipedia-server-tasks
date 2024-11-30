import { describe, expect, it, vi } from 'vitest';

import TcgplayerClient from '../TcgPlayerClient';

describe('TcgplayerClient', () => {
  it('fetches the access token', async () => {
    const fakeAccessToken = 'fakeAccessToken';

    const spyOnfetch = vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          access_token: fakeAccessToken,
        }),
      ),
    );

    const tcgplayerClient = new TcgplayerClient('');

    const result = await tcgplayerClient.fetchToken({
      clientId: 'fakeClientId',
      clientSecret: 'fakeClientSecret',
    });

    expect(result).toMatchObject({
      data: {
        accessToken: fakeAccessToken,
      },
    });

    expect(spyOnfetch).toHaveBeenCalledOnce();

    spyOnfetch.mockRestore();
  });
});
