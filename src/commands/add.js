/*jshint esversion: 8 */

const { SlashCommandBuilder } = require("@discordjs/builders");
const {
	PREFIX,
	WHITELIST_ROLE_ID,
	CMD_CHANNEL,
	LOG_CHANNEL,
} = require("../../config.js");

const announcement_msg = `Yō 7's crew @everyone! ᐟᐟᐟᐟ\n\nThe <@&882300073730519041> have been on the lookout, scouting for potential Sevens. We are feeling confident the following 7 have it in them to become a real Seven. Therefore we will add them to the pre-sale whitelist!\n\nHuge congrats to:\n${stringified_members.substring(
	0,
	stringified_members.length - 2
)}! If you have not received a DM from this bot regarding further instructions, please reach out to one of the <@&882300035373613057>.\n\nHow to make it to the whitelist? Be here, be creative, be kind, help others and spread the word.
				`;

module.exports = {
	data: new SlashCommandBuilder()
		.setName("add")
		.setDescription("Add user(s) to whitelist"),
	execute: async (client, message) => {
		// sanity check for whitelisting possible channels to speak in
		if (CMD_CHANNEL && message.channel.id === CMD_CHANNEL) {
			if (message.member.permissions.has("ADMINISTRATOR")) {
				const role = message.guild.roles.cache.get(WHITELIST_ROLE_ID);
				let members = [];
				let stringified_members = "";

				// iteratable form of collection
				message.mentions.members.each((member) => {
					members.push(member);
					stringified_members += `<@${member.id}>, `;
				});

				for (const member of members) {
					try {
						// promote user and dm
						member.roles.add(role);
						const user = message.mentions.users.get(member.id);
						const channel = await user.createDM();
						await channel.send(
							`Congratulations <@${member.id}>. You have been selected for The Sevens whitelist! Please respond to this DM with your address and your address only! Spamming will lead to removal from the whitelist`
						);
					} catch (err) {
						// notify who does not have DM permissions.
						await message.channel.send(
							`Unable to DM <@${member.id}>`
						);
					}
				}

				message.react("✅");

				// send message to log channel announcing selection of new whitelisted sevens
				client.channels.cache.get(LOG_CHANNEL).send(announcement_msg);
			}
		}
	},
};
