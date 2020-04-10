const DataLoader = require('dataloader');
const Photo = require('./photo.model');

module.exports = new DataLoader(
	(keys) =>
		Photo.find({ _id: { $in: keys } })
			.populate('owner')
			.populate('taggedUsers')
			.populate({ path: 'likes', populate: { path: 'liker' } })
			.populate({ path: 'comments', populate: { path: 'commentor' } })
			.exec(),
	{
		cacheKeyFn: (key) => key.toString(),
	}
);
