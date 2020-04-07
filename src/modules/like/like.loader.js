const DataLoader = require('dataloader');
const Like = require('./like.model');

module.exports = new DataLoader((keys) => Like.find({ _id: { $in: keys } }), {
	cacheKeyFn: (key) => key.toString(),
});
