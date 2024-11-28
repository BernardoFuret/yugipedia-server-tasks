import 'dotenv/config';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import DiscordLogger from '@libs/discord-logger';
import Logger from '@libs/logger';

import config from './config';
import { loggerLabel } from './constants';

const srcDirname = dirname(fileURLToPath(import.meta.url));

const logger = Logger.create({ isDebug: config.isDebug, srcDirname, label: loggerLabel });

const discordLogger = new DiscordLogger({
  baseLogger: logger,
  label: loggerLabel,
  channelId: config.discordLogChannelId,
});

await discordLogger.initiate(config.discordBotToken);

discordLogger.info('test', loggerLabel);

await discordLogger.terminate();
