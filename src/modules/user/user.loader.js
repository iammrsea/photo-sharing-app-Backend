const DataLoader = require('dataloader');
const User = require('./user.model');

module.exports = () => ({
	userById: new DataLoader(
		(keys) =>
			User.find({ _id: { $in: keys } })
				.populate('profile')
				.exec(),
		{
			cacheKeyFn: (key) => key.toString(),
		}
	),
	usersById: new DataLoader(
		(keys) =>
			User.find({ _id: { $in: keys } })
				.populate('profile')
				.exec(),
		{
			cacheKeyFn: (key) => key.toString(),
		}
	),
});
