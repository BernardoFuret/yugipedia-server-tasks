import 'dotenv/config';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import DiscordLogger from '@libs/discord-logger';
import Logger from '@libs/logger';

import config from './config';
import { loggerLabel } from './constants';
import task from './task';

const srcDirname = dirname(fileURLToPath(import.meta.url));

const logger = Logger.create({ isDebug: config.isDebug, srcDirname, label: loggerLabel });

logger.debug('Debug mode is on');

const discordLogger = new DiscordLogger({
  baseLogger: logger,
  label: loggerLabel,
  channelId: config.discord.logChannelId,
});

await discordLogger.initiate(config.discord.botToken);

try {
  await task(discordLogger);
} catch (error) {
  discordLogger.error('Unexpected error:', error);
} finally {
  await discordLogger.terminate();
}
