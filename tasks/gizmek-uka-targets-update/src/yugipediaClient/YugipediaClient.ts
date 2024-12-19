import { gizmekUkaTaregtsQuery } from './constants';
import { type IFetchGizmekUkaTargetsResponse, type IYugipediaClient } from './types';

class YugipediaClient implements IYugipediaClient {
  readonly #baseUrl: string;

  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }

  // TODO: make generic SMW fetcher
  async fetchGizmekUkaTargets(): Promise<IFetchGizmekUkaTargetsResponse> {
    const url = `${this.#baseUrl}?${gizmekUkaTaregtsQuery}`;

    const response = await fetch(url);

    const jsonData = await response.json();

    return {
      data: jsonData,
    };
  }
}

export default YugipediaClient;
