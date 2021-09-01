/*jshint esversion: 8 */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { PREFIX } = require("../../config.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("add")
		.setDescription("Add user(s) to whitelist"),
	execute: async (client, message) => {
		if (message.member.permissions.has("ADMINISTRATOR")) {
			const suffix = message.content.split(PREFIX)[1].split(" ");
			const commandName = suffix[0];
			const members = new Set(suffix.slice(1, suffix.length));
			console.log(members);
		}
		/*if (interaction.member.permissions.has("ADMINISTRATOR")) {
			await interaction.reply("requesting user is admin");
		}*/
	},
};
