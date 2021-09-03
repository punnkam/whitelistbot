# Whitelist Discord Bot

```
bum#5410: 0xbA842b7DA417Ba762D75e8F99e11c2980a8F8051
punnkam#3339: 0xe2da7fe4f82af891c3d23a7ecabd1f7d7562bf09
```

### config.js

```js
module.exports = {
	PUBLIC: "",
	CLI_ID: "",
	GUILD_ID: "",
	TOKEN: "",
	PREFIX: "wl!", // what ever you want the bot commmand to start with
	CMD_CHANNEL: "", // channel this bot receives commands from
	ADDRESS_CHANNEL: "", // channel this bot sends incoming addresses to
	LOG_CHANNEL: "", // channel this bot logs whitelist msgs to (congratulatory messages)
	WHITELIST_ROLE_ID: "", // role id bots promote users to for whitelist. set to null if no promotion is needed
};
```

run file

```bat
cd src
node deploy-commands.js && npx nodemon init.js
```

## Commands

### wl!add [users]

example: wl!add @user1#9999 @user2#1928

Here's what will happen:

-   The bot promotes the users and attempts the DM each one.
-   If any users is not contactable due to their permissions, the bot will notify the admins of the incident.
-   The bot will make a public announcement mentioning the users who have been whitelisted
-   The whitelisted individual sends the bot their address
-   The bot records the address into a channel.
    -   To further improve, can connect to directly to smart contract and update from there
