const { gql } = require('apollo-server-express');

module.exports = gql`
	type Reply {
		id: ID!
		replier: User!
		content: String
		createdAt: String
	}
	input CreateReplyData {
		commentId: String!
		replierId: String!
		content: String!
	}

	extend type Query {
		reply(id: ID!): Reply
	}
	extend type Mutation {
		createReply(reply: CreateReplyData!): Reply
		editReply(id: ID!, content: String!): Reply
	}
`;
