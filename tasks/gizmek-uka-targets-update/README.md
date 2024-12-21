# Gizmek Uka targets update

Task to update the "[Gizmek Uka, the Festive Fox of Fecundity](https://yugipedia.com/wiki/Gizmek_Uka,_the_Festive_Fox_of_Fecundity)" targets for the [interactive Yugipedia page](https://yugipedia.com/GizmekUkaTargets/index.html).

### Configuration

The task can be configured via an `.env` file.

An example `.env.example` file is provided. Duplicate it and rename it to `.env`.

The following environment variables are available:

* `DEBUG`: Optional variable. Enables logging more detailed messages. Expects
boolean values (if empty or not set, it is converted to `false`; `true` otherwise).

* `DISCORD_BOT_TOKEN`: The token for the Discord bot account.

* `DISCORD_LOG_CHANNEL_ID`: The channel ID receiving the messages to be logged.

* `YUGIPEDIA_API_URL`: Sets the URL for the Yugipedia API. Must not have a trailing `/`.

* `GIZMEK_UKA_TARGETS_EXTENSION_DATA_FILE_PATH`: The file path for the interactive Yugipedia page data file to be updated with the new data. Expects an absolute path.
