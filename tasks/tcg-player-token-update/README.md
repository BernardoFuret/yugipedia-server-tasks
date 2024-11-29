# TCGplayer token update

Task to update the TCGplayer token used by the [TCGplayer extension](TCGplayer-mw-extension) to fetch prices info.

### Configuration

The task can be configured via an `.env` file.

An example `.env.example` file is provided. Duplicate it and rename it to `.env`.

The following environment variables are available:

* `DEBUG`: Optional variable. Enables logging more detailed messages. Expects
boolean values (if empty or not set, it is converted to `false`; `true` otherwise).

* `DISCORD_BOT_TOKEN`: The token for the Discord bot account.

* `DISCORD_LOG_CHANNEL_ID`: The channel ID receiving the messages to be logged.

* `TCGPLAYER_API_URL`: Sets the URL for the TCGplayer API. Must not have a trailing `/`.

* `TCGPLAYER_CLIENT_ID`: The TCGplayer client ID.

* `TCGPLAYER_CLIENT_SECRET`: The TCGplayer client secret.

* `TCGPLAYER_EXTENSION_CONFIG_FILE_PATH`: The TCGplayer path for the extension configuration file to be updated with the new token. Expects an absolute path.
