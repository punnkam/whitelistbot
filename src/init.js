require("dotenv").config();
const { Client, Intents } = require("discord.js");
const { TOKEN } = process.env;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
	console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
	console.log(interaction, interaction.isCommand());
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === "wlb_add") {
		await interaction.reply("Adding users to whitelist...");
	} else if (commandName === "wlb_remove") {
		await interaction.reply("Removing users from whitelist...");
	} else if (commandName === "wlb_get") {
		await interaction.reply("Retrieving users...");
	}
});

client.login(TOKEN);
