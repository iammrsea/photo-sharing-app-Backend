const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: false,
			unique: true,
		},
		password: String,
		providerId: String,
		profile: {
			type: Schema.Types.ObjectId,
			ref: 'Profile',
		},
	},
	{ timestamps: true, autoIndex: 'false' }
);

userSchema.post('remove', removeProfile);

async function removeProfile(doc) {
	console.log('post middleware ', doc);
	const Profile = mongoose.model('Profile');
	await Profile.remove({ owner: doc._id });
}

const User = mongoose.model('User', userSchema);

User.createIndexes({ username: 'text' });

module.exports = User;
