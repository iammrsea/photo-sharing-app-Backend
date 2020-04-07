const Comment = require('./comment.model');

class CommentService {
	createComment(comment) {
		const newComment = new Comment({
			...comment,
		});
		return newComment.save();
	}
	editComment(id, content) {
		return Comment.findOneAndUpdate(
			{ _id: id },
			{ content },
			{
				upsert: true,
				new: true,
				useFindAndModify: false,
			}
		);
	}
	deleteComment(id) {
		return id;
	}
	getComment(id) {
		return Comment.findById(id);
	}
}

module.exports = CommentService;
