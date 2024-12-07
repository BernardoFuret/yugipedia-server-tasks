interface IConfig {
  isDebug: boolean;

  discord: {
    botToken: string;
    logChannelId: string;
  };
}

export type { IConfig };
