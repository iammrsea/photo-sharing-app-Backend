module.exports = {
	Mutation: {
		createReply(_, { reply }, { services: { replyService } }) {
			return replyService.createReply(reply);
		},
		editReply(_, { id, content }, { services: { replyService } }) {
			return replyService.editReply(id, content);
		},
	},
	Query: {
		reply(_, { id }, { loaders: { replyLoaders } }) {
			return replyLoaders.replyById.load(id);
		},
	},
	Reply: {
		comment(root, _, { loaders: { commentLoaders } }) {
			return commentLoaders.load(root.commentId);
		},
		replier(root, _, { loaders: { userLoaders } }) {
			return userLoaders.load(root.replierId);
		},
	},
};
