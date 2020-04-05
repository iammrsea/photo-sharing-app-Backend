module.exports = {
	Query: {
		users(_, { first, after, filter = {}, sorting = {} }, { services: { userService } }) {
			return userService.getUsers({ first, after, filter, sorting });
		},
		searchUsers(_, { first, after, searchText, sorting = {} }, { services: { userService } }) {
			return userService.searchUsers({ first, after, searchText, sorting });
		},
		user(_, { id }, { loaders: { userLoaders } }) {
			return userLoaders.load(id);
		},
	},
	Mutation: {
		// createManyUsers(_, { users }, { services: { userService } }) {
		// 	return userService.createManyUsers(users);
		// },
		// deleteManyUsers(_, __, { userService }) {
		// 	return userService.deleteManyUsers();
		// },
		formSignUp(_, { newUser }, { services: { userService }, pubnub }) {
			return userService.signUpUsingForm({ ...newUser }, pubnub);
		},
		formSignIn(_, { signinData }, { services: { userService } }) {
			return userService.formSignIn({ ...signinData });
		},
	},
	User: {},
};
