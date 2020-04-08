const DataLoader = require('dataloader');
const Comment = require('./comment.model');

module.exports = new DataLoader(
	(keys) =>
		Comment.find({ _id: { $in: keys } })
			.populate('commentor')
			.populate({ path: 'replies', populate: { path: 'replier' } })
			.exec(),
	{
		cacheKeyFn: (key) => key.toString(),
	}
);
