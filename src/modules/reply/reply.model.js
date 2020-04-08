const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Types = mongoose.Schema.Types;

const replySchema = new Schema(
	{
		replier: {
			type: Types.ObjectId,
			ref: 'User',
		},
		commentId: {
			type: Types.ObjectId,
		},
		content: String,
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
	await Comment.updateOne({ _id: doc.commentId }, { $pull: { replies: { $eq: doc._id } } });
}
module.exports = mongoose.model('Reply', replySchema);
