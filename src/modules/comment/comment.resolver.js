module.exports = {
	Query: {
		comment(_, { id }, { loaders: { commentLoaders } }) {
			return commentLoaders.load(id);
		},
	},
	Mutation: {
		createComment(_, { comment }, { services: { commentService } }) {
			return commentService.createComment(comment);
		},
		editComment(_, { id, content }, { services: { commentService } }) {
			return commentService.editComment(id, content);
		},
	},
	Comment: {
		// commentor(root, _, { loaders: { userLoaders } }) {
		// 	return userLoaders.load(root.commentorId);
		// },
		totalReply(root, _, { services: { replyService } }) {
			return replyService.totalReply(root.commentorId);
		},
		// replies(root, _, { loaders: { replyLoaders } }) {
		// 	return replyLoaders.repliesByCommentId.load(root._id);
		// },
	},
};
