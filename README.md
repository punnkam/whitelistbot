# Whitelist Discord Bot

### config.js

```js
module.exports = {
	PUBLIC: "",
	CLI_ID: "",
	GUILD_ID: "",
	CLI_SEC: "",
	TOKEN: "",
	PREFIX: "wl!",
	RECEIVE_WHITELIST: "channel_id", // channel this bot receives commands from
	SEND_WHITELIST: "channel_id", // channel this bot sends whitelist updates to
	LOG_WHITELIST: "channel_id", // channel this bot logs whitelist-related msgs to
	WHITELIST_ROLE: "role_id", // role id bots promote users to for whitelist. set to null if no promotion is needed
};
```

run file

```bat
cd src
node deploy-commands.js && npx nodemon init.js
```
