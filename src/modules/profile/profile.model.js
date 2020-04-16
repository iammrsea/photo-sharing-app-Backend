const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const profileSchema = new mongoose.Schema(
	{
		owner: {
			type: Types.ObjectId,
			ref: 'User',
			required: true,
		},
		about: {
			type: String,
			required: true,
		},
		picture: {
			type: String,
			required: true,
		},
		pictureId: String,
	},
	{ timestamps: true }
);

profileSchema.post('save', updateUser);
async function updateUser(doc) {
	const User = mongoose.model('User');
	await User.updateOne({ _id: doc.owner }, { profile: doc._id });
	// await User.findOneAndUpdate({ _id: doc.owner }, { profile: doc._id }, { upsert: true });
}

module.exports = mongoose.model('Profile', profileSchema);
