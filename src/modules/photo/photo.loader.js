const DataLoader = require('dataloader');
const Photo = require('./photo.model');

module.exports = new DataLoader((keys) => Photo.find({ _id: { $in: keys } }), {
	cacheKeyFn: (key) => key.toString(),
});
