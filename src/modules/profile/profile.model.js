const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const profileSchema = new mongoose.Schema(
	{
		owner: {
			type: Types.ObjectId,
			required: true,
		},
		description: String,
		picture: String,
	},
	{ timestamps: true }
);

const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;
