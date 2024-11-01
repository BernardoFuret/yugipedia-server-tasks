import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import Logger from '@libs/logger';
import { log } from '@libs/test-lib';

const srcDirname = dirname(fileURLToPath(import.meta.url));

const logger = Logger.create({ srcDirname, label: 'test-lib' });

log('>>>', 'Example', 1);

logger.warn('>>>', 'warn', 1, { a: () => {}, b: 1 }, [1, '2', {}, logger]);

logger.error(new TypeError('type error', { cause: 'some cause' }));
