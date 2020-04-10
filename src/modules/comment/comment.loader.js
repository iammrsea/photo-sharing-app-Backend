const DataLoader = require('dataloader');
const Comment = require('./comment.model');

module.exports = {
	commentById: new DataLoader(
		(keys) =>
			Comment.find({ _id: { $in: keys } })
				.populate('commentor')
				.populate({ path: 'replies', populate: { path: 'replier' } })
				.exec(),
		{
			cacheKeyFn: (key) => key.toString(),
		}
	),
	commentsByPhotoId: new DataLoader(
		(keys) =>
			Comment.find({ photoId: { $in: keys } })
				.populate('commentor')
				.populate({ path: 'replies', populate: { path: 'replier' } })
				.exec(),
		{
			cacheKeyFn: (key) => key.toString(),
		}
	),
};
