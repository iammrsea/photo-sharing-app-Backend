const { gql } = require('apollo-server-express');

module.exports = gql`
	type Like {
		id: ID!
		photoId: ID!
		likerId: ID!
		liker: User!
		createdAt: String!
	}

	input CreateLikeData {
		photoId: String!
		liker: String!
	}
	extend type Query {
		like(id: ID!): Like!
	}

	extend type Mutation {
		createLike(like: CreateLikeData!): Like
		deleteLike(id: ID!): Like
	}
`;
