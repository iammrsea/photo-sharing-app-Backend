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
		providerSignIn(_, { signinData }, { services: { userService } }) {
			return userService.providerSignIn(signinData);
		},
		editUser(_, { id, editUserData }, { services: { userService }, req }) {
			return userService.editUser(id, editUserData, req);
		},
		deleteUser(_, { id }, { services: { userService }, req }) {
			return userService.deleteUser(id, req);
		},
	},
	User: {
		sharedPhotos(root, { first, after, filter = {}, sorting = {} }, { services: { photoService } }) {
			return photoService.sharedPhotosByUser({ ownerId: root._id, first, after, filter, sorting });
		},
		photosTagged(root, { first, after, filter = {}, sorting = {} }, { services: { photoService } }) {
			return photoService.photosUserIsTagged({ userId: root._id, first, after, filter, sorting });
		},

		// profile(root, _, { services: { profileService } }) {
		// 	return profileService.getUserProfile(root._id);
		// },
	},
};
