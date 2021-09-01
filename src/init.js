/*jshint esversion: 8 */

const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { TOKEN, GUILD_ID, PREFIX, ADDRESS_CHANNEL } = require("../config.js");
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
	],
	partials: ["CHANNEL"],
});

client.commands = new Collection();

const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once("ready", () => {
	console.log("Ready!");
});

client.on("messageCreate", async (message) => {
	if (message.author.bot) return;
	if (message.channel.type === "DM") {
		try {
			// validate address as much as possible. could use ethers to get address as well
			if (!message.content.startsWith("0x"))
				throw "Invalid start on address";
			if (message.content.length !== 42)
				throw "Invalid length of address";

			// post message in ADDRESS_CHANNEL {user: address}
			await client.channels.cache
				.get(ADDRESS_CHANNEL)
				.send(`<@${message.author.id}>: ${message.content}`);

			message.react("✅");
		} catch (err) {
			message.react("❌");
			message.reply(err);
		}
	} else if (message.channel.type === "GUILD_TEXT") {
		if (!message.content.startsWith(PREFIX)) return;
		const suffix = message.content.split(PREFIX)[1].split(" ");
		const commandName = suffix[0];

		const command = client.commands.get(commandName);

		if (!command) return;

		try {
			await command.execute(client, message);
		} catch (error) {
			console.error(chalk.red(error));
			message.reply("There was an error while executing this command!");
		}
	}
});

client.login(TOKEN);
