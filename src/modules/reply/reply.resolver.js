module.exports = {
	Mutation: {
		async createReply(_, { reply }, { services: { replyService }, pubsub }) {
			return await replyService.createReply(reply, pubsub);
		},
		async editReply(_, { id, content }, { services: { replyService } }) {
			return await replyService.editReply(id, content);
		},
	},
	Query: {
		async reply(_, { id }, { loaders: { replyLoaders } }) {
			return await replyLoaders().replyById.load(id);
		},
	},
	Subscription: {
		replyAdded: {
			subscribe(_, { commentId }, { pubsub }) {
				return pubsub.asyncIterator(commentId);
			},
		},
	},
	Reply: {
		// comment(root, _, { loaders: { commentLoaders } }) {
		// 	return commentLoaders.load(root.commentId);
		// },
		async replier(root, _, { loaders: { userLoaders } }) {
			return await userLoaders().userById.load(root.replier);
		},
	},
};
