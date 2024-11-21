import { ChannelManager, Client } from 'discord.js';
import { describe, expect, it, vi } from 'vitest';

import DiscordClient from '../DiscordClient';

describe('DiscordClient', () => {
  it('initiates the Discord Client', async () => {
    const spyOnClientPrototypeLogin = vi
      .spyOn(Client.prototype, 'login')
      .mockImplementation(async () => '');

    const spyOnClientPrototypeOnce = vi
      .spyOn(Client.prototype, 'once')
      .mockImplementation((_event, fn) => {
        fn();

        return Client.prototype;
      });

    const fakeToken = 'fakeToken';

    const discordClient = new DiscordClient();

    await discordClient.initiate(fakeToken);

    expect(spyOnClientPrototypeLogin).toHaveBeenCalledTimes(1);

    expect(spyOnClientPrototypeLogin).toHaveBeenCalledWith(fakeToken);

    expect(spyOnClientPrototypeOnce).toHaveBeenCalledTimes(1);

    spyOnClientPrototypeLogin.mockRestore();

    spyOnClientPrototypeOnce.mockRestore();
  });

  it('gets a Channel by ID if it exists', async () => {
    const spyOnChannelManagerPrototypeFetch = vi
      .spyOn(ChannelManager.prototype, 'fetch')
      .mockResolvedValue(expect.anything());

    const fakeChannelId = 'fakeChannelId';

    const discordClient = new DiscordClient();

    const channel = await discordClient.getChannelById(fakeChannelId);

    expect(channel).not.toBeNull();

    expect(spyOnChannelManagerPrototypeFetch).toHaveBeenCalledTimes(1);

    expect(spyOnChannelManagerPrototypeFetch).toHaveBeenCalledWith(fakeChannelId);

    spyOnChannelManagerPrototypeFetch.mockRestore();
  });

  it('throws an error if it tries to get a Channel by an unknown ID', async () => {
    const spyOnChannelManagerPrototypeFetch = vi
      .spyOn(ChannelManager.prototype, 'fetch')
      .mockResolvedValue(null);

    const fakeChannelId = 'fakeChannelId';

    const discordClient = new DiscordClient();

    await expect(() => discordClient.getChannelById(fakeChannelId)).rejects.toThrow('not found');

    expect(spyOnChannelManagerPrototypeFetch).toHaveBeenCalledTimes(1);

    expect(spyOnChannelManagerPrototypeFetch).toHaveBeenCalledWith(fakeChannelId);

    spyOnChannelManagerPrototypeFetch.mockRestore();
  });

  it('terminates the Discord Client', async () => {
    const spyOnClientPrototypeTerminate = vi
      .spyOn(Client.prototype, 'destroy')
      .mockImplementation(async () => {});

    const discordClient = new DiscordClient();

    await discordClient.terminate();

    expect(spyOnClientPrototypeTerminate).toHaveBeenCalledTimes(1);

    spyOnClientPrototypeTerminate.mockRestore();
  });
});
