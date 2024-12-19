import zod from 'zod';

const schema = zod.object({
  DEBUG: zod.coerce.boolean(),

  DISCORD_BOT_TOKEN: zod.string().trim().min(1),
  DISCORD_LOG_CHANNEL_ID: zod.string().trim().min(1),

  YUGIPEDIA_API_URL: zod.string().trim().min(1).regex(/[^/]$/),

  GIZMEK_UKA_TARGETS_EXTENSION_DATA_FILE_PATH: zod.string().trim().min(1),
});

export default schema;
