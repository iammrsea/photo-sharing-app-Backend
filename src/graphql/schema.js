const { gql } = require('apollo-server-express');
const userTypeDefs = require('../modules/user/user.schema');
const commentTypeDefs = require('../modules/comment/comment.schema');
const photoTypeDefs = require('../modules/photo/photo.schema');
const replyTypeDefs = require('../modules/reply/reply.schema');
const profileTypeDefs = require('../modules/profile/profile.schema');
const queryTypeDefs = require('./query');
const mutationTypeDefs = require('./mutation');
const subscriptionTypeDefs = require('./subscription');

const generalTypeDefs = gql`
	union Node = User | Photo

	type Edge {
		cursor: String!
		node: Node
	}

	#Custom Scalar Type
	scalar DateTime

	type PageInfo {
		endCursor: String!
		hasNextPage: Boolean!
	}
	enum SortDirection {
		ASCENDING
		DESCENDING
	}
`;

module.exports = [
	userTypeDefs,
	commentTypeDefs,
	photoTypeDefs,
	replyTypeDefs,
	profileTypeDefs,
	queryTypeDefs,
	mutationTypeDefs,
	subscriptionTypeDefs,
	generalTypeDefs,
];
