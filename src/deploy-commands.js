const Discord = require("discord.js");
const Rest = require("@discordjs/rest");
const config = require("./Config/config.json");
const fs = require("fs");
const Sentry = require( "@sentry/node" );
let logFileStream = fs.createWriteStream( config.logFileStreamPath, { flags: "a" } );
let streamKonsole = new console.Console( logFileStream, logFileStream, false );
let time = Date.now();
const currentDate = new Date(time).toISOString();

const commands = [
	new Discord.SlashCommandBuilder().setName('ping').setDescription('Replies with pong !')
]
	.map(command => command.toJSON());

const rest = new Rest.REST({version: '10'}).setToken(config.token);
try {
	rest.put(Routes.applicationCommands(config.selfID), {body: commands})
		.then(() => streamKonsole.log('Successfully registered application commands !'))
} catch (e) {
	streamKonsole.error(e);
	Sentry.captureException(e);
}
