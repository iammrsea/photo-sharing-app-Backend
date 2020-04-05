const { gql } = require('apollo-server-express');

module.exports = gql`
	type Photo {
		id: ID
	}

	input PhotoFilter {
		category: PhotoCategory
		searchText: String
	}

	enum SortablePhotoField {
		description
		created
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
	}
`;
