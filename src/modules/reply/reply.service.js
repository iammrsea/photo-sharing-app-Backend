const Reply = require('./reply.model');
class ReplyService {
	totalReply(commnetId) {
		return Reply.countDocuments({ commnetId });
	}
	async createReply(reply, pubsub) {
		const newReply = new Reply({
			...reply,
		});
		const result = await newReply.save();
		pubsub.publish(reply.commnetId, { replyAdded: result });
		return result;
	}
	editReply(id, content) {
		return Reply.findOneAndUpdate(
			{ _id: id },
			{ content },
			{
				upsert: true,
				new: true,
				useFindAndModify: false,
			}
		);
	}
}

module.exports = ReplyService;
