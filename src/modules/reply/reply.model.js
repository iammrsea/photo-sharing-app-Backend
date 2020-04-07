const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Types = mongoose.Schema.Types;

const replySchema = new Schema(
	{
		replierId: {
			type: Types.ObjectId,
		},
		commentId: {
			type: Types.ObjectId,
		},
		content: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('reply', replySchema);
