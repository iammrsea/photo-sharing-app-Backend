const Photo = require('./photo.model');
const dataTransformer = require('../data-transformer/data-transformer.service');
const queryBuilder = require('../query-builder/query-builder.service');
const { handleError } = require('../../utils/helpers');
class PhotoService {
	async getPhotos({ userId, ownerId, first, after, filter, sorting: { sortBy, sortOrder } }) {
		// await Photo.createIndexes();
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
				query.where({ owner: ownerId });
			}
			const build = queryBuilder(query, { first, after, sortBy, sortOrder });
			query = build.query;
			query
				.populate('owner')
				.populate({ path: 'comments', populate: { path: 'commentor' } })
				.populate('taggedUsers');
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
	async likePhoto(likePhotoData, pubsub) {
		const result = await Photo.updateOne(
			{ _id: likePhotoData.photoId },
			{ $push: { likes: likePhotoData.likerId } }
		);
		pubsub.publish(`photo-${likePhotoData.photoId}`, {
			photoLikedOrUnliked: { likerId: likePhotoData.likerId, action: 'like' },
		});
		return result;
	}
	async unlikePhoto(unlikePhotoData, pubsub) {
		const result = await Photo.updateOne(
			{ _id: unlikePhotoData.photoId },
			{ $pull: { likes: unlikePhotoData.likerId } }
		);
		pubsub.publish(`photo-${unlikePhotoData.photoId}`, {
			photoLikedOrUnliked: { likerId: unlikePhotoData.likerId, action: 'unlike' },
		});
		return result;
	}
	async createPhoto(photoData, imageService, pubsub) {
		try {
			const { owner, description, taggedUsers, category } = photoData;
			const { createReadStream } = await photoData.photo;
			// console.log('photo', createReadStream());
			const sourceStream = createReadStream();
			const image = await imageService.uploadImage({ sourceStream });
			const newPhoto = new Photo({
				owner,
				description,
				taggedUsers,
				category,
				photoUrl: image.secure_url,
			});
			const result = await newPhoto.save();
			pubsub.publish('PHOTO_ADDED', { photoAdded: result });
			return result;
		} catch (e) {
			console.log('error uploading image', e.message);
			return handleError(e);
		}
	}
	async searchPhotos({ first, after, searchText, sorting: { sortOrder, sortBy } }) {
		// await Photo.createIndexes();
		let query = Photo.find({ $text: { $search: searchText } });
		const build = queryBuilder(query, { first, after, sortBy, sortOrder });
		query = build.query;
		query
			.populate('owner')
			.populate({ path: 'comments', populate: { path: 'commentor' } })
			.populate('taggedUsers');
		const data = await query.exec();
		return {
			...dataTransformer({
				data,
				limit: build.limit,
				sortOrder: build.sort,
				sortBy: build.sortingBy,
			}),
		};
	}
	editPhotoMeta(id, photoMeta) { }
	changePhoto(id, photo) { }
	deletePhoto(id) { }

	async createManyPhotos(photos) {
		return await Photo.insertMany(photos);
	}
	async deleteManyPhotos() {
		const result = await Photo.deleteMany();
		console.log('deleted photos', result);
		return result;
	}
	async editPhotoComment(id, comments) {
		const photo = await Photo.findById(id);
		comments.forEach((id) => photo.comments.push(id));
		return Photo.findByIdAndUpdate({ _id: id }, photo, {
			upsert: true,
			new: true,
		});
	}
}

module.exports = PhotoService;
