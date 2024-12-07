import zod from 'zod';

const schema = zod.object({
  DEBUG: zod.coerce.boolean(),

  DISCORD_BOT_TOKEN: zod.string().trim().min(1),
  DISCORD_LOG_CHANNEL_ID: zod.string().trim().min(1),
});

export default schema;
