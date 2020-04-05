const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: String,
		profilePicture: String,
	},
	{ timestamps: true }
);

const User = mongoose.model('user', userSchema);
User.createIndexes({ username: 'text' });

module.exports = User;
