const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
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
	},
	{ timestamps: true }
);

const User = mongoose.model('user', userSchema);
User.createIndexes({ username: 'text' });

module.exports = User;
