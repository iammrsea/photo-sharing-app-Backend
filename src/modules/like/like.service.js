const Like = require('./like.model');

class LikeService {
	totalLike(photoId) {}
	createLike(like) {
		const newLike = new Like(like);
		return newLike.save();
	}
	deleteLike(id) {
		return Like.findByIdAndDelete(id);
	}
	totalLikeByPhotoId(photoId) {
		return Like.countDocuments({ photoId });
	}
}

module.exports = LikeService;
