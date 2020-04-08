const { gql } = require('apollo-server-express');

module.exports = gql`
	type Photo {
		id: ID!
		story: String
		fileId: String
		photoUrl: String!
		owner: User!
		taggedUsers: [User!]!
		comments: [Comment!]!
		createdAt: String!
		totalLike: Int
		totalComment: Int
		likes: [Like!]!
		category: PhotoCategory
	}

	type PhotoConnection {
		edges: [Edge!]!
		pageInfo: PageInfo!
		totalCount: Int
	}

	input CreatePhotoData {
		ownerId: String!
		photo: Upload!
		story: String
		taggedUsers: [String!]!
		category: PhotoCategory!
	}
	input EditPhotoData {
		story: String
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
		SELFIE
		PORTRAIT
		LANDSCAPE
		ACTION
		FUN
		GRAPHIC
		OTHER
	}

	extend type Query {
		photo(id: ID!): Photo!
		photos(first: Int, after: Int, sorting: PhotoSortData, filter: PhotoFilter): PhotoConnection
	}

	extend type Mutation {
		createPhoto(photoData: CreatePhotoData!): Photo
		editPhotoMeta(id: ID!, photoMeta: EditPhotoData!): Photo
		changePhoto(id: ID!, photo: Upload!): Photo
		deletePhoto(id: ID!): Photo
	}
`;
