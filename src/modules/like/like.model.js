const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Types = mongoose.Schema.Types;

const likeSchema = new Schema(
	{
		likerId: {
			type: Types.ObjectId,
		},
		photoId: {
			type: Types.ObjectId,
		},
		content: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('like', likeSchema);
