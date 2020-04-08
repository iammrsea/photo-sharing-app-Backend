const Photo = require('./photo.model');
const dataTransformer = require('../data-transformer/data-transformer.service');
const queryBuilder = require('../query-builder/query-builder.service');
const { handleError } = require('../../utils/helpers');
class PhotoService {
	async getPhotos({ userId, ownerId, first, after, filter, sorting: { sortBy, sortOrder } }) {
		try {
			let query;
			if (userId) {
				query = Photo.find({ taggedUsers: userId });
			} else {
				query = Photo.find({});
			}

			if (filter.category) {
				query.where({ category: filter.category });
				// query = User.find({ $text: { $search: searchText } });
			}
			if (ownerId) {
				query.where({ ownerId });
			}
			const build = queryBuilder(query, { first, after, sortBy, sortOrder });
			query = build.query;

			const data = await query.exec();
			const totalCount = await Photo.estimatedDocumentCount();
			return {
				...dataTransformer({
					data,
					limit: build.limit,
					sortOrder: build.sort,
					sortBy: build.sortingBy,
				}),
				totalCount,
			};
		} catch (e) {
			console.log('error gettting photos');
			return handleError(e);
		}
	}
	async sharedPhotosByUser({ ownerId, first, after, filter, sorting }) {
		return this.getPhotos({ ownerId, first, after, filter, sorting });
	}
	async photosUserIsTagged({ userId, first, after, filter, sorting }) {
		return this.getPhotos({ userId, first, after, filter, sorting });
	}
	createPhoto(id, photoData) {}
	editPhotoMeta(id, photoMeta) {}
	changePhoto(id, photo) {}
	deletePhoto(id) {}
}

module.exports = PhotoService;
