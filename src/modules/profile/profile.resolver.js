module.exports = {
	Mutation: {
		async createProfile(_, { profileData }, { services: { profileService, imageService }, req }) {
			// console.log('photoData', photoData);
			// const { createReadStream } = await photoData.photo;
			return await profileService.createProfile(profileData, req, imageService);
		},
		async deleteProfile(_, { id }, { services: { profileService } }) {
			return await profileService.deleteProfile(id);
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
