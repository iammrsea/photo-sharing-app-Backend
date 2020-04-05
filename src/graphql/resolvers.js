const { merge } = require('lodash');
const { GraphQLScalarType } = require('graphql');
const userResolvers = require('../modules/user/user.resolver');

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
	DateTime: new GraphQLScalarType({
		name: 'DateTime',
		description: 'A valid date time value.',
		parseValue: (value) => new Date(value),
		serialize: (value) => new Date(value).toISOString(),
		parseLiteral: (ast) => ast.value,
	}),
};
module.exports = merge(userResolvers, resolvers);
