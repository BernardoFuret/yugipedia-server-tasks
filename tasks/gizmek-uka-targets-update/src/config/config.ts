import schema from './schema';
import { type IConfig } from './types';

const { error, data } = schema.safeParse(process.env);

if (error) {
  throw new Error('Invalid configuration', { cause: error.issues });
}

const config: IConfig = {
  isDebug: data.DEBUG,

  discord: {
    botToken: data.DISCORD_BOT_TOKEN,
    logChannelId: data.DISCORD_LOG_CHANNEL_ID,
  },

  yugipedia: {
    apiUrl: data.YUGIPEDIA_API_URL,
  },

  gizmekUkaTargetsExtension: {
    dataFilePath: data.GIZMEK_UKA_TARGETS_EXTENSION_DATA_FILE_PATH,
  },
} as const;

export default config;
