/**@format */

const Discord = require( "discord.js" );
const Event = require( "../Structures/event" );
const fs = require( "fs" );
const config = require( "../Config/config.json" );
let logFileStream = fs.createWriteStream( config.logFileStreamPath, { flags: "a" } );
let streamKonsole = new console.Console( logFileStream, logFileStream, false );

module.exports = new Event( "ready", async ( client ) => {
	streamKonsole.log(
		`[CLIENT INFO] Time : ${client.readyAt}.\n Gate-Seeker is up, logged in as ${client.user.tag} (${client.user.id}), ready on ${client.guilds.cache.size} servers.`,
	);

	console.log(
		`[CLIENT INFO] Time : ${client.readyAt}.\n Gate-Seeker is up, logged in as ${client.user.tag} (${client.user.id}), ready on ${client.guilds.cache.size} servers.`,
	);

	client.user.setPresence( {
		activities: [
			{
				name: "with Arky | gs!help",
				type: 0,
			},
		],
		status: "online",
	} );
} );
