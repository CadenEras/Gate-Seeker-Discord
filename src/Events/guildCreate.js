/** @format */

const Event = require("../Structures/event");
const fs = require("fs");
const config = require("../Config/config.json");
let logFileStream = fs.createWriteStream(config.logFileStreamPath, { flags: "a" });
let streamKonsole = new console.Console(logFileStream, logFileStream, false);
let time = Date.now();
const currentDate = new Date(time).toISOString();

module.exports = new Event("guildCreate", (client, guild, message) => {
	streamKonsole.log(
		`${currentDate} [GUILD EVENT] ${guild.name} (${guild.id}) added Gate-Seeker. Ready on it.`
	);
});
