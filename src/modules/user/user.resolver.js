module.exports = {
	Query: {
		users(_, { first, after, filter = {}, sorting = {} }, { userService }) {
			return userService.getUsers({ first, after, filter, sorting });
		},
		searchUsers(_, { first, after, searchText, sorting = {} }, { userService }) {
			return userService.searchUsers({ first, after, searchText, sorting });
		},
	},
	Mutation: {
		createManyUsers(_, { users }, { userService }) {
			return userService.createManyUsers(users);
		},
		deleteManyUsers(_, __, { userService }) {
			return userService.deleteManyUsers();
		},
	},
	User: {},
};
