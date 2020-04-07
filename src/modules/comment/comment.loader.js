const DataLoader = require('dataloader');
const Comment = require('./comment.model');

module.exports = new DataLoader((keys) => Comment.find({ _id: { $in: keys } }), {
	cacheKeyFn: (key) => key.toString(),
});
