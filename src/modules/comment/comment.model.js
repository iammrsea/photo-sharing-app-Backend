const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Types = mongoose.Schema.Types;

const commentSchema = new Schema(
	{
		commentorId: {
			type: Types.ObjectId,
		},
		photoId: {
			type: Types.ObjectId,
		},
		content: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('comment', commentSchema);
