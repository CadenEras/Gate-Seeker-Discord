/** @format */

const Command = require("../Structures/command");
const fs = require("fs");
const config = require("../Config/config.json");
const Sentry = require("@sentry/node");
let logFileStream = fs.createWriteStream(config.logFileStreamPath, { flags: "a" });
let streamKonsole = new console.Console(logFileStream, logFileStream, false);
let time = Date.now();
const currentDate = new Date(time).toISOString();

module.exports = new Command({
	name: "ping",
	description: "Get the bot response time !",
	usage: "ping",
	permission: "SEND_MESSAGES",
	async run(message, args, client) {
		try {
			await message.channel.send(`pong ! I'm alive ! ${Math.round(client.ws.ping)} ms, ${
				Date.now() - message.createdTimestamp
			} ms.`);
		} catch (error) {
			Sentry.captureException(error);
			streamKonsole.error(
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