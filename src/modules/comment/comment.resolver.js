module.exports = {
	Query: {
		async comment(_, { id }, { loaders: { commentLoaders } }) {
			return await commentLoaders().commentById.load(id);
		},
		async comments(_, __, { services: { commentService } }) {
			return await commentService.comments();
		},
		async commentsByPhotoId(_, { photoId }, { services: { commentService } }) {
			return await commentService.commentsByPhotoId(photoId);
		},
	},
	Mutation: {
		async createComment(_, { comment }, { services: { commentService }, pubsub }) {
			return await commentService.createComment(comment, pubsub);
		},
		async editComment(_, { id, content }, { services: { commentService } }) {
			return await commentService.editComment(id, content);
		},
		async createManyComments(_, { comments }, { services: { commentService } }) {
			return await commentService.createManyComments(comments);
		},
		async deleteManyComments(_, __, { services: { commentService } }) {
			return await commentService.deleteManyComments();
		},
	},
	Subscription: {
		commentAdded: {
			subscribe(_, { photoId }, { pubsub }) {
				return pubsub.asyncIterator(photoId);
			},
		},
	},
	Comment: {
		async commentor(root, _, { loaders: { userLoaders } }) {
			return await userLoaders().userById.load(root.commentor);
		},
		async totalReply(root, _, { services: { replyService } }) {
			return await replyService.totalReply(root.commentorId);
		},
		async replies(root, _, { loaders: { replyLoaders } }) {
			return await replyLoaders().repliesByCommentId.load(root._id);
		},
	},
};
