const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const profileSchema = new mongoose.Schema(
	{
		ownerId: {
			type: Types.ObjectId,
			required: true,
		},
		description: String,
		picture: String,
		pictureId: String,
	},
	{ timestamps: true }
);

const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;
