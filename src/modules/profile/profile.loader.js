const DataLoader = require('dataloader');
const Profile = require('./profile.model');

module.exports = () =>
	new DataLoader(
		(keys) =>
			Profile.find({ _id: { $in: keys } })
				.populate('owner')
				.exec(),
		{
			cacheKeyFn: (key) => key.toString(),
		}
	);
