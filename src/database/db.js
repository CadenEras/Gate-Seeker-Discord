/**@Format*/

const Discord = require( "discord.js" );
let charSchema = require( "./charSchema" );
let guildSchema = require( "./guildSchema" );
let memberSchema = require( "./memberSchema" );
let logSchema = require( "./log" );
let warnSchema = require( "./warnSchema" );
const fs = require( "fs" );
const config = require( "../Config/config.json" );
let logFileStream = fs.createWriteStream( config.logFileStreamPath, { flags: "a" } );
let streamKonsole = new console.Console( logFileStream, logFileStream, false );
let time = Date.now();
const currentDate = new Date(time).toISOString();

//Create/Find Guilds Data
module.exports.fetchCharacter = async function( key, charName) {
	let charDB = await charSchema.findOne( { _id: key } );

	if( charDB ) {
		return ( charDB );
	} else {

	}
};
