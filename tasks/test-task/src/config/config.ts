import schema from './schema';
import { type IConfig } from './types';

const { error, data } = schema.safeParse(process.env);

if (error) {
  throw new Error('Invalid configuration', { cause: error.issues });
}

const config: IConfig = {
  isDebug: data.DEBUG,

  discordBotToken: data.DISCORD_BOT_TOKEN,
  discordLogChannelId: data.DISCORD_LOG_CHANNEL_ID,
} as const;

export default config;
