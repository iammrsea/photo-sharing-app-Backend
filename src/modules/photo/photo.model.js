const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = mongoose.Schema.Types;

const photoSchema = new Schema(
	{
		description: {
			type: Types.String,
			required: true,
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
			},
		],
		comments: [
			{
				type: Types.ObjectId,
				ref: 'Comment',
			},
		],
	},

	{ timestamps: true, autoIndex: false }
);
photoSchema.post('remove', removeLinkedDocs);
async function removeLinkedDocs(doc) {
	const Comment = mongoose.model('Comment');
	await Comment.remove({ _id: { $in: doc.comments } });
}
const Photo = mongoose.model('Photo', photoSchema);
Photo.createIndexes({ category: 'text', description: 'text' });
module.exports = Photo;
