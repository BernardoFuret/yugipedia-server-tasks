import 'dotenv/config';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import DiscordLogger from '@libs/discord-logger';
import Logger from '@libs/logger';
import { log } from '@libs/test-lib';

import config from './config';

const srcDirname = dirname(fileURLToPath(import.meta.url));

const logger = Logger.create({ srcDirname, label: 'test-lib' });

const discordLogger = new DiscordLogger({
  baseLogger: logger,
  label: 'test-lib',
  channelId: config.discordLogChannelId,
});

await discordLogger.initiate(config.discordBotToken);

log('>>>', 'Example', 1);

discordLogger.debug('Debug example');

discordLogger.info('info', new TypeError('e'));

discordLogger.warn('>>>', 'warn', 1, { a: () => {}, b: 1 }, [1, '2', {}, logger]);

discordLogger.error(new TypeError('type error', { cause: { data: 'some cause' } }));

await discordLogger.terminate();
