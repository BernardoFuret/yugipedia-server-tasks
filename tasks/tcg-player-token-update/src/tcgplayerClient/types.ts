interface IFetchTokenParams {
  clientId: string;
  clientSecret: string;
}

interface IFetchTokenResponseData {
  accessToken: string;
}

interface IFetchTokenResponse extends IWrapper<IFetchTokenResponseData> {}

interface IWrapper<TData> {
  data: TData;
}

interface ITcgplayerClient {
  fetchToken(params: IFetchTokenParams): Promise<IFetchTokenResponse>;
}

export type { IFetchTokenParams, IFetchTokenResponse, ITcgplayerClient };
