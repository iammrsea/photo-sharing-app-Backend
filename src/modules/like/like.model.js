const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Types = mongoose.Schema.Types;

const likeSchema = new Schema(
	{
		liker: {
			type: Types.ObjectId,
			ref: 'User',
		},
		photoId: {
			type: Types.ObjectId,
		},
	},
	{ timestamps: true }
);

likeSchema.post('save', updatePhoto);
async function updatePhoto(doc) {
	const Photo = mongoose.model('Photo');
	await Photo.updateOne({ _id: doc.photoId }, { $push: { likes: doc._id } });
}
likeSchema.post('remove', removeLikeFromPhoto);
async function removeLikeFromPhoto(doc) {
	const Photo = mongoose.model('Photo');
	await Photo.updateOne({ _id: doc.photoId }, { $pull: { likes: { $eq: doc._id } } });
}

module.exports = mongoose.model('Like', likeSchema);
