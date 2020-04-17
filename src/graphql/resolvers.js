const { merge } = require('lodash');
const { GraphQLScalarType } = require('graphql');
const userResolvers = require('../modules/user/user.resolver');
const commentResovlers = require('../modules/comment/comment.resolver');
const photoResolvers = require('../modules/photo/photo.resolver');
const replyResolvers = require('../modules/reply/reply.resolver');
const profileResolvers = require('../modules/profile/profile.resolver');


const resolvers = {
	Node: {
		__resolveType(obj, ctx, info) {
			if (obj.username) {
				return 'User';
			}
			if (obj.photoUrl) {
				return 'Photo';
			}
			return null;
		},
	},
};
module.exports = merge(
	userResolvers,
	resolvers,
	commentResovlers,
	profileResolvers,
	replyResolvers,
	photoResolvers
);
