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

  tcgplayer: {
    apiUrl: data.TCGPLAYER_API_URL,
    clientId: data.TCGPLAYER_CLIENT_ID,
    clientSecret: data.TCGPLAYER_CLIENT_SECRET,
  },

  tcgplayerExtension: {
    configFilePath: data.TCGPLAYER_EXTENSION_CONFIG_FILE_PATH,
  },
} as const;

export default config;
