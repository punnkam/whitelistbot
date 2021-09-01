/*jshint esversion: 8 */

const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { TOKEN, GUILD_ID, PREFIX } = require("../config.js");
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_MESSAGE_TYPING,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGE_TYPING,
	],
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
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;
	const suffix = message.content.split(PREFIX)[1].split(" ");
	const commandName = suffix[0];

	/*if (!interaction.isCommand()) return;*/

	const command = client.commands.get(commandName);
	//let admin_roles = [];

	if (!command) return;

	/*interaction.member.guild.roles.fetch().then((res) => {
		res.map((role) => {
			if (role.permissions.has("ADMINISTRATOR"))
				admin_roles.push(role.id);
		});
	});*/

	try {
		await command.execute(client, message);
	} catch (error) {
		console.error(error);
		message.reply("There was an error while executing this command!");
		/*await interaction.reply({
			content: "There was an error while executing this command!",
			ephemeral: true,
		});*/
	}
});

client.login(TOKEN);
