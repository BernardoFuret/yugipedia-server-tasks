interface IConfig {
  isDebug: boolean;

  discord: {
    botToken: string;
    logChannelId: string;
  };
  yugipedia: {
    apiUrl: string;
  };

  gizmekUkaTargetsExtension: {
    dataFilePath: string;
  };
}

export type { IConfig };
