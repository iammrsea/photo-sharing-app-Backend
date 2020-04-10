const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = mongoose.Schema.Types;

const photoSchema = new Schema(
	{
		fileId: {
			type: Types.String,
			required: false,
		},
		story: {
			type: Types.String,
		},
		owner: {
			type: Types.ObjectId,
			ref: 'User',
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
		likes: [
			{
				type: Types.ObjectId,
				ref: 'Like',
			},
		],
		comments: [
			{
				type: Types.ObjectId,
				ref: 'Comment',
			},
		],
	},

	{ timestamps: true }
);
photoSchema.post('remove', removeLinkedDocs);
async function removeLinkedDocs(doc) {
	const Like = mongoose.model('Like');
	const Comment = mongoose.model('Comment');
	await Like.remove({ _id: { $in: doc.likes } });
	await Comment.remove({ _id: { $in: doc.comments } });
}
module.exports = mongoose.model('Photo', photoSchema);
