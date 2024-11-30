interface IConfig {
  isDebug: boolean;

  discord: {
    botToken: string;
    logChannelId: string;
  };

  tcgplayer: {
    apiUrl: string;
    clientId: string;
    clientSecret: string;
  };

  tcgplayerExtension: {
    configFilePath: string;
  };
}

export type { IConfig };
