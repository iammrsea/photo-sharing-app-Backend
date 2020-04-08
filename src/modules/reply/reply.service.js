const Reply = require('./reply.model');
class ReplyService {
	totalReply(commnetId) {
		return Reply.estimatedDocumentCount({ commnetId });
	}
	createReply(reply) {
		const newReply = new Reply({
			...reply,
			replier: reply.replierId,
		});
		return newReply.save();
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
