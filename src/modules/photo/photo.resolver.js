module.exports = {
	Mutation: {
		async createPhoto(_, { photoData }, { services: { photoService, imageService }, pubsub }) {
			// console.log('photoData', photoData);
			// const { createReadStream } = await photoData.photo;
			return await photoService.createPhoto(photoData, imageService, pubsub);
		},
		async editPhotoMeta(_, { id, photoMeta }, { services: { photoService } }) {
			return await photoService.editPhotoMeta(id, photoMeta);
		},
		async changePhoto(_, { id, photo }, { services: { photoService } }) {
			return await photoService.changedPhoto(id, photo);
		},
		async deletePhoto(_, { id }, { services: { photoService } }) {
			return await photoService.deletePhoto(id);
		},
		async createManyPhotos(_, { photos }, { services: { photoService } }) {
			return await photoService.createManyPhotos(photos);
		},
		async deleteManyPhotos(_, __, { services: { photoService } }) {
			return await photoService.deleteManyPhotos();
		},
		async editPhotoComment(_, { id, comments }, { services: { photoService } }) {
			return await photoService.editPhotoComment(id, comments);
		},
		async likePhoto(_, { likePhotoData }, { services: { photoService }, pubsub }) {
			return await photoService.likePhoto(likePhotoData, pubsub);
		},
		async unlikePhoto(_, { unlikePhotoData }, { services: { photoService }, pubsub }) {
			return await photoService.unlikePhoto(unlikePhotoData, pubsub);
		},
	},
	Query: {
		async photo(_, { id }, { loaders: { photoLoaders } }) {
			return await photoLoaders().load(id);
		},
		async photos(_, { first, after, filter = {}, sorting = {} }, { services: { photoService } }) {
			return await photoService.getPhotos({ first, after, filter, sorting });
		},
	},
	Photo: {
		async totalComment(root, __, { services: { commentService } }) {
			return await commentService.totalCommentByPhotoId(root._id);
		},
		async owner(root, _, { loaders: { userLoaders } }) {
			return await userLoaders().userById.load(root.owner);
		},
		// totalLike(root, __, { services: { likeService } }) {
		// 	return likeService.totalLikeByPhotoId(root._id);
		// },
	},
	Subscription: {
		photoLikedOrUnliked: {
			subscribe(_, { identifier }, { pubsub }) {
				return pubsub.asyncIterator(identifier);
			},
		},
		photoAdded: {
			subscribe(_, __, { pubsub }) {
				return pubsub.asyncIterator('PHOTO_ADDED');
			},
		},
	},
};
