import 'dotenv/config';

import { readFile, writeFile } from 'node:fs/promises';

import { type IDiscordLogger } from '@libs/discord-logger';

import config from './config';
import { SummoningCategories } from './constants';
import { type IGizmekUkaTargetEntry } from './types';
import YugipediaClient, { type ISmwGizmekUkaTarget } from './yugipediaClient';

const computeGizmekUkaTargets = (smwResult: ISmwGizmekUkaTarget): IGizmekUkaTargetEntry[] => {
  const monsters: IGizmekUkaTargetEntry[] = [];

  Object.entries(smwResult.query.results).forEach(([pagename, { printouts }]) => {
    const isEgyptionGodOriginalVersion = pagename.match('(original)');

    const isRitualMonster = printouts['Primary type'].some((t) => t.fulltext.match(/ritual/i));

    if (!isEgyptionGodOriginalVersion && !isRitualMonster) {
      monsters.push({
        name: pagename,
        atkDef: printouts.ATK[0] || printouts.DEF[0],
        attribute: printouts.Attribute[0]?.fulltext,
        type: printouts.Type[0]?.fulltext,
        level: printouts['Stars string'][0],
        ssFromDeck: !printouts.Summoning.find(
          (o) => o.fulltext === SummoningCategories.NO_SPECIAL_SUMMON_FROM_DECK,
        ),
        isNormalMonster: !!printouts['Primary type'].find((o) => o.fulltext.match(/Normal/)),
      });
    }
  });

  return monsters;
};

const updateFile = async (dataFilePath: string, monsters: IGizmekUkaTargetEntry[]) => {
  const content = await readFile(dataFilePath, 'utf8');

  const updatedContent = content.replace(
    /(?<=^[ \t]*const[ \t]+YUGIPEDIA_DATA[ \t]+=[ \t]+)(.*?)(; ?)(.*?)$/gm,
    `${JSON.stringify(monsters)}$2// Last updated at: ${new Date().toISOString()}`,
  );

  return writeFile(dataFilePath, updatedContent);
};

const task = async (discordLogger: IDiscordLogger): Promise<void> => {
  const yugipediaClient = new YugipediaClient(config.yugipedia.apiUrl);

  const { data: smwResult } = await yugipediaClient.fetchGizmekUkaTargets();

  const gizmekUkaTargets = computeGizmekUkaTargets(smwResult);

  await updateFile(config.gizmekUkaTargetsExtension.dataFilePath, gizmekUkaTargets);

  discordLogger.info('Updated with success!');
};

export default task;
