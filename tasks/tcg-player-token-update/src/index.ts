import 'dotenv/config';

import { readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import DiscordLogger from '@libs/discord-logger';
import Logger from '@libs/logger';

import config from './config';
import { loggerLabel } from './constants';
import TcgplayerClient from './tcgplayerClient';

const srcDirname = dirname(fileURLToPath(import.meta.url));

const logger = Logger.create({ isDebug: config.isDebug, srcDirname, label: loggerLabel });

logger.debug('Debug mode is on');

const discordLogger = new DiscordLogger({
  baseLogger: logger,
  label: loggerLabel,
  channelId: config.discord.logChannelId,
});

await discordLogger.initiate(config.discord.botToken);

const tcgplayerClient = new TcgplayerClient(config.tcgplayer.apiUrl);

try {
  const { data } = await tcgplayerClient.fetchToken({
    clientId: config.tcgplayer.clientId,
    clientSecret: config.tcgplayer.clientSecret,
  });

  const content = await readFile(config.tcgplayerExtension.configFilePath, 'utf8');

  const updatedContent = content.replace(
    /(?<=^[ \t]*\$tcgplayerConfigBearerToken[ \t]+=[ \t]+')(.*?)';(.*?)$/gm,
    () => `${data.accessToken}'; // Last updated at: ${new Date().toISOString()}`,
  );

  await writeFile(config.tcgplayerExtension.configFilePath, updatedContent);

  discordLogger.info('Updated with success!');
} catch (error) {
  discordLogger.error('Unexpected error:', error);
}

await discordLogger.terminate();
