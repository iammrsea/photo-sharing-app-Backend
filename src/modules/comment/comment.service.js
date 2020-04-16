const Comment = require('./comment.model');

class CommentService {
	async createComment(comment, pubsub) {
		// console.log('adding new comment', comment);
		const newComment = new Comment({
			...comment,
		});
		const result = await newComment.save();
		pubsub.publish(comment.photoId, { commentAdded: result });
		return result;
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
	async commentsByPhotoId(photoId) {
		return await Comment.find({ photoId })
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
	async comments() {
		return await Comment.find({});
	}
	async totalCommentByPhotoId(photoId) {
		return await Comment.countDocuments({ photoId });
	}
}

module.exports = CommentService;
