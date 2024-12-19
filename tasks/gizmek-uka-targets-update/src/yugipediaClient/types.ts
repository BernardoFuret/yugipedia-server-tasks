interface IWrapper<TData> {
  data: TData;
}

interface ISmwGizmekUkaTarget {
  query: {
    results: Record<
      string,
      {
        // TODO: split to more generic SMW response.
        printouts: {
          ATK: [number];
          DEF: [number];
          Attribute: [{ fulltext: string; fullurl: string }?];
          Type: [{ fulltext: string; fullurl: string }?];
          'Stars string': [string];
          Summoning: { fulltext: string; fullurl: string }[];
          'Primary type': { fulltext: string; fullurl: string }[];
        };
      }
    >;
  };
}

interface IFetchGizmekUkaTargetsResponse extends IWrapper<ISmwGizmekUkaTarget> {}

interface IYugipediaClient {
  fetchGizmekUkaTargets(): Promise<IFetchGizmekUkaTargetsResponse>;
}

export type { IFetchGizmekUkaTargetsResponse, ISmwGizmekUkaTarget, IYugipediaClient };
