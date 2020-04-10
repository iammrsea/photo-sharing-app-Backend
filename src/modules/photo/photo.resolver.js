module.exports = {
	Mutation: {
		createPhoto(_, { photoData }, { services: { photoService } }) {
			return photoService.createPhoto(photoData);
		},
		editPhotoMeta(_, { id, photoMeta }, { services: { photoService } }) {
			return photoService.editPhotoMeta(id, photoMeta);
		},
		changePhoto(_, { id, photo }, { services: { photoService } }) {
			return photoService.changedPhoto(id, photo);
		},
		deletePhoto(_, { id }, { services: { photoService } }) {
			return photoService.deletePhoto(id);
		},
		createManyPhotos(_, { photos }, { services: { photoService } }) {
			return photoService.createManyPhotos(photos);
		},
		deleteManyPhotos(_, __, { services: { photoService } }) {
			return photoService.deleteManyPhotos();
		},
		editPhotoComment(_, { id, comments }, { services: { photoService } }) {
			return photoService.editPhotoComment(id, comments);
		},
	},
	Query: {
		photo(_, { id }, { loaders: { photoLoaders } }) {
			return photoLoaders.load(id);
		},
		photos(_, { first, after, filter = {}, sorting = {} }, { services: { photoService } }) {
			return photoService.getPhotos({ first, after, filter, sorting });
		},
	},
	Photo: {
		totalComment(root, __, { services: { commentService } }) {
			return commentService.totalCommentByPhotoId(root._id);
		},
		totalLike(root, __, { services: { likeService } }) {
			return likeService.totalLikeByPhotoId(root._id);
		},
	},
};
