/** @format */

const Command = require("../Structures/command");
const Discord = require("discord.js");
const fs = require("fs");
const config = require("../Config/config.json");
const Sentry = require("@sentry/node");
let logFileStream = fs.createWriteStream(config.logFileStreamPath, { flags: "a" });
let streamKonsole = new console.Console(logFileStream, logFileStream, false);
let time = Date.now();
const currentDate = new Date(time).toISOString();

module.exports = new Command({
	name: "help",
	description: "Display the list of commands and info about commands !",
	usage: "help or help [command]",
	permission: "SEND_MESSAGES",
	async run(message, args, client) {
		const command = client.commands.find((cmd) => cmd.name === args[1]);

		//TODO fix that !

		try {
			if (!command) {
				const embed1 = new Discord.EmbedBuilder()

					.setTitle("Gate-Seeker's Library")
					.setColor("#af4ae9")
					.setDescription(
						"Get all the help you need with me !\n Try `gs!help [command]` for more info !"
					)
					.setThumbnail("https://i.imgur.com/owmcBui.png")
					.setAuthor({
						name: "Gate-Seeker's help module",
						iconURL: "https://i.imgur.com/owmcBui.png",
					})
					.addFields(
						{
							name: "Commands",
							value: "`help` `info` `user-info` `about` `ping`",
						},
					)
					.setTimestamp()
					.setFooter({
						text: "Made By CadenEras#2020, with love <3",
					});

				await message.channel.send({ embeds: [embed1] });
			} else {
				const embed2 = new Discord.EmbedBuilder()

					.setTitle("Gate-Seeker's Library")
					.setColor("#af4ae9")
					.setDescription("Get all the help you need with me !")
					.setThumbnail("https://i.imgur.com/owmcBui.png")
					.setAuthor({
						name: "Gate-Seeker's help module",
						iconURL: "https://i.imgur.com/owmcBui.png",
					})
					.addFields(
						{
							name: `Command :`,
							value: `${message.guild.prefix}${command.name}`,
						},
						{
							name: `Description:`,
							value: `${command.description}\n`,
						},
						{
							name: `Usage :`,
							value: `${command.usage}\n`,
						}
					)
					.setTimestamp()
					.setFooter({
						text: "Made By CadenEras#2020, with love <3",
					});
				message.channel.send({ embeds: [embed2] });
			}
		} catch (error) {
			Sentry.captureException(error);
			streamKonsole.error( `${currentDate} => error occurred in ${message.guild.id} => \n\t\t\t => ${error}` );
			//temporary
			console.error(
				`${currentDate} => error occurred in ${message.guild.id} => \n\t\t\t => ${error}`
			);

			const channelDev = client.guilds.cache
				.get(config.baseGuildId)
				.channels.cache.find((channel) => channel.id === config.baseDevLogChannelId);
			channelDev.send(
				`An Error occurred in ${message.guild.name} (${message.guild.id}). Stack error log : ${error}`
			);
			return message.reply(
				`Something went wrong... You should report that in my maintenance server with your guild id and the command you tried to use.`
			);
		}
	},
});