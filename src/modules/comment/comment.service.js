const Comment = require('./comment.model');

class CommentService {
	createComment(comment) {
		// console.log('adding new comment', comment);
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
	commentsByPhotoId(photoId) {
		return Comment.find({ photoId })
			.populate('commentor')
			.populate({ path: 'replies', populate: { path: 'replier' } })
			.exec();
	}
	getComment(id) {
		return Comment.findById(id);
	}
	createManyComments(comments) {
		return Comment.insertMany(comments);
	}
	async deleteManyComments() {
		console.log('deleting comments');
		const result = await Comment.deleteMany();
		console.log('result', result);
		return result;
	}
	comments() {
		return Comment.find({});
	}
	totalCommentByPhotoId(photoId) {
		return Comment.countDocuments({ photoId });
	}
}

module.exports = CommentService;
