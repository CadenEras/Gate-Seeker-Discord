/**@format */

const config = require("../Config/config.json");
const mongoose = require("mongoose");

const reqString = {
	type: String,
	required: true,
};

const charSchema = new mongoose.Schema({
	_id: reqString, //guild ID
	charName: { type: String, required: false },
	prefix: { type: String, default: config.prefix },
	joignedAt: Date,
	muteRoleId: { type: String, required: false },
	memberRoleId: { type: String, required: false },
	logChannelId: { type: String, required: false },
	systemChannelId: { type: String, required: false },

	addons: {
		type: Object,
		default: {
			welcome: {
				enabled: false,
				channelId: null,
				message: null,
			},
		},
	},
});

module.exports = mongoose.model("Character", charSchema);
