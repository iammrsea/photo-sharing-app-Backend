const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = mongoose.Schema.Types;

const photoSchema = new Schema(
	{
		fileId: {
			type: Types.String,
			required: true,
		},
		story: {
			type: Types.String,
		},
		ownerId: {
			type: Types.ObjectId,
			required: true,
		},
		photoUrl: {
			type: Types.String,
			required: true,
		},
		category: {
			type: Types.String,
			required: true,
		},
		taggedUsers: [
			{
				type: Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('photo', photoSchema);
