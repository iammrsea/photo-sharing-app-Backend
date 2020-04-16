module.exports = {
	Query: {
		async users(_, { first, after, filter = {}, sorting = {} }, { services: { userService } }) {
			return await userService.getUsers({ first, after, filter, sorting });
		},
		async searchUsers(_, { first, after, searchText, sorting = {} }, { services: { userService } }) {
			return await userService.searchUsers({ first, after, searchText, sorting });
		},
		async user(_, { id }, { loaders: { userLoaders }, services: { userService } }) {
			return await userLoaders().userById.load(id);
		},
		async me(_, __, { loaders: { userLoaders }, req }) {
			return await userLoaders().userById.load(req.userId);
		},
		async usersById(_, { ids }, { loaders: { userLoaders } }) {
			return await userLoaders().usersById.loadMany(ids);
		},
		async photoLikers(_, { ids }, { loaders: { userLoaders } }) {
			return await userLoaders().usersById.loadMany(ids);
		},
	},

	Mutation: {
		async createManyUsers(_, { users }, { services: { userService } }) {
			return await userService.createManyUsers(users);
		},
		async deleteManyUsers(_, __, { services: { userService } }) {
			return await userService.deleteManyUsers();
		},
		async formSignUp(_, { newUser }, { services: { userService }, pubnub }) {
			return await userService.signUpUsingForm({ ...newUser }, pubnub);
		},
		async formSignIn(_, { signinData }, { services: { userService } }) {
			return await userService.formSignIn({ ...signinData });
		},
		async providerSignIn(_, { signinData }, { services: { userService } }) {
			return await userService.providerSignIn(signinData);
		},
		async editUser(_, { id, editUserData }, { services: { userService }, req }) {
			return await userService.editUser(id, editUserData, req);
		},
		async deleteUser(_, { id }, { services: { userService }, req }) {
			return await userService.deleteUser(id, req);
		},
	},
	User: {
		async sharedPhotos(root, { first, after, filter = {}, sorting = {} }, { services: { photoService } }) {
			return await photoService.sharedPhotosByUser({ ownerId: root._id, first, after, filter, sorting });
		},
		async photosTagged(root, { first, after, filter = {}, sorting = {} }, { services: { photoService } }) {
			return await photoService.photosUserIsTagged({ userId: root._id, first, after, filter, sorting });
		},

		// profile(root, _, { services: { profileService } }) {
		// 	return profileService.getUserProfile(root._id);
		// },
	},
};
