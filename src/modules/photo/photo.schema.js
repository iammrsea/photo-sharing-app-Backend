const { gql } = require('apollo-server-express');

module.exports = gql`
	type Photo {
		id: ID!
		description: String
		photoUrl: String!
		owner: User!
		taggedUsers: [User!]!
		comments: [Comment!]!
		createdAt: String!
		totalComment: Int
		likes: [String!]!
		category: PhotoCategory
	}

	type PhotoConnection {
		edges: [Edge!]!
		pageInfo: PageInfo!
		totalCount: Int
	}

	type LikeUnlike {
		likerId: String!
		action: String!
	}
	input CreatePhotoData {
		owner: String!
		photo: Upload!
		description: String
		taggedUsers: [String!]!
		category: PhotoCategory!
	}
	input EditPhotoData {
		description: String
		category: PhotoCategory
	}
	input PhotoFilter {
		category: PhotoCategory
		# searchText: String
	}

	enum SortablePhotoField {
		createdAt
		category
	}

	input PhotoSortData {
		sortOrder: SortDirection = DESCENDING
		sortBy: SortablePhotoField = createdAt
	}
	enum PhotoCategory {
		PETS
		TRAVEL
		MOVIES
		ACTION
		FUN
		OTHER
	}
	input LikePhoto {
		photoId: String!
		likerId: String!
	}
	input UnlikePhoto {
		photoId: String!
		likerId: String!
	}
	input FakePhoto {
		owner: String!
		photoUrl: String!
		story: String
		taggedUsers: [String!]!
		category: PhotoCategory!
	}

	extend type Query {
		photo(id: ID!): Photo!
		photos(first: Int, after: String, sorting: PhotoSortData, filter: PhotoFilter): PhotoConnection
		searchPhotos(first: Int, after: String, sorting: PhotoSortData, searchText: String!): PhotoConnection
	}

	extend type Mutation {
		createPhoto(photoData: CreatePhotoData!): Photo
		editPhotoMeta(id: ID!, photoMeta: EditPhotoData!): Photo
		changePhoto(id: ID!, photo: Upload!): Photo
		deletePhoto(id: ID!): Photo
		createManyPhotos(photos: [FakePhoto!]!): [Photo]
		deleteManyPhotos: [Photo]
		editPhotoComment(id: ID!, comments: [String!]!): Photo
		likePhoto(likePhotoData: LikePhoto!): Photo
		unlikePhoto(unlikePhotoData: UnlikePhoto!): Photo
	}
	extend type Subscription {
		photoLikedOrUnliked(identifier: String!): LikeUnlike!
		photoAdded: Photo!
	}
`;
