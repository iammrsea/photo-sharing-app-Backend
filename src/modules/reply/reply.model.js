const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Types = mongoose.Schema.Types;

const replySchema = new Schema(
	{
		replier: {
			type: Types.ObjectId,
			required: true,
			ref: 'User',
		},
		commentId: {
			type: Types.ObjectId,
			required: true,
			ref: 'Comment',
		},
		content: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
replySchema.post('save', updateComment);
async function updateComment(doc) {
	const Comment = mongoose.model('Comment');
	await Comment.updateOne({ _id: doc.commentId }, { $push: { replies: doc._id } });
}

replySchema.post('remove', removeReplyFromComment);
async function removeReplyFromComment(doc) {
	const Comment = mongoose.model('Comment');
	await Comment.updateOne({ _id: doc.commentId }, { $pull: { replies: doc._id } });
}
module.exports = mongoose.model('Reply', replySchema);
