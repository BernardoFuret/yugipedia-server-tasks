import 'dotenv/config';

import { readFile, writeFile } from 'node:fs/promises';

import { type IDiscordLogger } from '@libs/discord-logger';

import config from './config';
import TcgplayerClient from './tcgplayerClient';

const task = async (discordLogger: IDiscordLogger): Promise<void> => {
  const tcgplayerClient = new TcgplayerClient(config.tcgplayer.apiUrl);

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
};

export default task;
