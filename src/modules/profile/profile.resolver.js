module.exports = {
	Mutation: {
		createProfile(_, { profileData }, { services: { profileService, imageService }, req }) {
			// console.log('photoData', photoData);
			// const { createReadStream } = await photoData.photo;
			return profileService.createProfile(profileData, req, imageService);
		},
		deleteProfile(_, { id }, { services: { profileService } }) {
			return profileService.deleteProfile(id);
		},
		editProfile(_, { id, about }, { services: { profileService }, req }) {
			return profileService.editProfile(id, about, req);
		},
		editProfilePicture(_, { id, picture }, { services: { profileService, imageService }, req }) {
			return profileService.editProfilePicture(id, picture, req, imageService);
		},
	},
	Query: {
		async profiles(_, __, { services: { profileService } }) {
			return await profileService.getAllProfiles();
		},
		async profile(_, { id }, { loaders: { profileLoaders } }) {
			return await profileLoaders().load(id);
		},
	},
};
