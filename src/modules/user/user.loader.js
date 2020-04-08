const DataLoader = require('dataloader');
const User = require('./user.model');

module.exports = new DataLoader(
	(keys) =>
		User.find({ _id: { $in: keys } })
			.populate('profile')
			.exec(),
	{
		cacheKeyFn: (key) => key.toString(),
	}
);
