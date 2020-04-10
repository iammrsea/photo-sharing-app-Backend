module.exports = {
	Query: {
		comment(_, { id }, { loaders: { commentLoaders } }) {
			return commentLoaders.commentById.load(id);
		},
		comments(_, __, { services: { commentService } }) {
			return commentService.comments();
		},
		commentsByPhotoId(_, { photoId }, { services: { commentService } }) {
			return commentService.commentsByPhotoId(photoId);
		},
	},
	Mutation: {
		createComment(_, { comment }, { services: { commentService } }) {
			return commentService.createComment(comment);
		},
		editComment(_, { id, content }, { services: { commentService } }) {
			return commentService.editComment(id, content);
		},
		createManyComments(_, { comments }, { services: { commentService } }) {
			return commentService.createManyComments(comments);
		},
		deleteManyComments(_, __, { services: { commentService } }) {
			commentService.deleteManyComments();
		},
	},
	Comment: {
		commentor(root, _, { loaders: { userLoaders } }) {
			return userLoaders.load(root.commentor);
		},
		totalReply(root, _, { services: { replyService } }) {
			return replyService.totalReply(root.commentorId);
		},
		replies(root, _, { loaders: { replyLoaders } }) {
			return replyLoaders.repliesByCommentId.load(root._id);
		},
	},
};
