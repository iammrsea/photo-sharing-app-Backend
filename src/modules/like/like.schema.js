const { gql } = require('apollo-server-express');

module.exports = gql`
	type Like {
		id: ID!
		photo: Photo
		liker: User!
		createdAt: String!
	}

	input CreateLikeData {
		photoId: String!
		likerId: String
	}
	extend type Query {
		like(id: ID!): Like!
	}

	extend type Mutation {
		createLike(like: CreateLikeData!): Like
		deleteLike(id: ID!): Like
	}
`;
