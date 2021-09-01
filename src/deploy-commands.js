/*jshint esversion: 8 */

const chalk = require("chalk");
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { CLI_ID, GUILD_ID, TOKEN } = require("../config.js");

const commands = [];
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(TOKEN);

(async () => {
	try {
		await rest.put(Routes.applicationGuildCommands(CLI_ID, GUILD_ID), {
			body: commands,
		});

		console.log("Successfully registered application commands.");
	} catch (error) {
		console.error(chalk.red(error));
	}
})();
