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
	},
	Query: {
		photo(_, { id }, { loaders: { photoLoaders } }) {
			return photoLoaders.load(id);
		},
		photos(_, { first, after, filter = {}, sorting = {} }, { services: { photoService } }) {
			return photoService.getPhotos({ first, after, filter, sorting });
		},
	},
};
