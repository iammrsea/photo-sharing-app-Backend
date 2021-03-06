const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Types = mongoose.Schema.Types;

const commentSchema = new Schema(
	{
		commentor: {
			type: Types.ObjectId,
			required: true,
			ref: 'User',
		},
		photoId: {
			type: Types.ObjectId,
			ref: 'Photo',
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		replies: [
			{
				type: Types.ObjectId,
				ref: 'Reply',
			},
		],
	},
	{ timestamps: true }
);
commentSchema.post('save', updatePhoto);
async function updatePhoto(doc) {
	// console.log('middleware ', doc);
	const Photo = mongoose.model('Photo');
	await Photo.updateOne({ _id: doc.photoId }, { $push: { comments: doc._id } });
}
commentSchema.post('remove', removeReplies);

async function removeReplies(doc) {
	const Reply = mongoose.model('Reply');
	const Photo = mongoose.model('Photo');
	await Reply.remove({ _id: { $in: doc.replies } });

	await Photo.updateOne({ _id: doc.photoId }, { $pull: { comments: doc._id } });
}
module.exports = mongoose.model('Comment', commentSchema);
