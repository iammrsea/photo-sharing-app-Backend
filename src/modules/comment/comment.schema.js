const { gql } = require('apollo-server-express');

module.exports = gql`
	type Comment {
		id: ID!
		commentor: User!
		content: String!
		createdAt: String!
		replies: [Reply!]!
		totalLike: Int
		totalReply: Int
	}
	input CreateCommentData {
		commentor: String!
		photoId: String!
		content: String!
	}

	extend type Query {
		comment(id: ID!): Comment!
		comments: [Comment!]!
		commentsByPhotoId(photoId: ID!): [Comment!]!
	}
	extend type Mutation {
		createComment(comment: CreateCommentData!): Comment!
		editComment(id: ID!, content: String!): Comment
		deleteComment(id: ID!): Comment
		createManyComments(comments: [CreateCommentData]): [Comment]
		deleteManyComments: [Comment]
	}
`;
