import { type Channel, Client, GatewayIntentBits } from 'discord.js';

import { type IDiscordClient } from './types';

class DiscordClient implements IDiscordClient {
  readonly #client: Client;

  constructor() {
    this.#client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        // TODO check if needed GatewayIntentBits.MessageContent, // enable for message content access
      ],
    });
  }

  async start(token: string): Promise<unknown> {
    const onceReadyPromise = new Promise((resolve) => {
      this.#client.once('ready', resolve);
    });

    this.#client.login(token);

    return onceReadyPromise;
  }

  async getChannelById(channelId: string): Promise<Channel> {
    const channel = await this.#client.channels.fetch(channelId);

    if (!channel) {
      throw new Error(`Channel with ID ${channelId} not found`, {
        cause: { channelId, channel },
      });
    }

    return channel;
  }

  async terminate(): Promise<void> {
    return this.#client.destroy();
  }
}

export default DiscordClient;
