import zod from 'zod';

const schema = zod.object({
  DEBUG: zod.coerce.boolean(),

  DISCORD_BOT_TOKEN: zod.string().trim().min(1),
  DISCORD_LOG_CHANNEL_ID: zod.string().trim().min(1),

  TCGPLAYER_API_URL: zod.string().trim().min(1).regex(/[^/]$/),
  TCGPLAYER_CLIENT_ID: zod.string().trim().min(1),
  TCGPLAYER_CLIENT_SECRET: zod.string().trim().min(1),

  TCGPLAYER_EXTENSION_CONFIG_FILE_PATH: zod.string().trim().min(1),
});

export default schema;
