import { type IFetchTokenParams, type IFetchTokenResponse, type ITcgplayerClient } from './types';

class TcgplayerClient implements ITcgplayerClient {
  readonly #baseUrl: string;

  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }

  async fetchToken({ clientId, clientSecret }: IFetchTokenParams): Promise<IFetchTokenResponse> {
    const response = await fetch(`${this.#baseUrl}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const jsonData = await response.json();

    const { access_token: accessToken } = jsonData;

    if (!accessToken) {
      throw new Error('Failed to fetch the bearer token', { cause: jsonData });
    }

    return {
      data: { accessToken },
    };
  }
}

export default TcgplayerClient;
