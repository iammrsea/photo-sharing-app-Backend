const DataLoader = require('dataloader');
const Reply = require('./reply.model');

module.exports = {
	replyById: new DataLoader(
		(keys) => {
			console.log('keys', keys);
			return Reply.find({ _id: { $in: keys } });
		},
		{
			cacheKeyFn: (key) => key.toString(),
		}
	),
	repliesByCommentId: new DataLoader(
		(keys) => {
			console.log('commentIds', keys);

			return repliesBatchFn(keys);
		},
		{
			cacheKeyFn: (key) => key.toString(),
		}
	),
};
async function repliesBatchFn(keys) {
	return keys.map(async (commentId) => {
		return await Reply.find({ commentId: commentId });
	});
}
