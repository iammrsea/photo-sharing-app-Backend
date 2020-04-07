const { handleError } = require('../../utils/helpers');
const Profile = require('./profile.model');
const uploaderService = require('../photo-uploader/uploader.service');

class ProfileService {
	async createProfile(profileData, req) {
		if (!req.isUserAuth) {
			return handleError('UnAuthorized');
		}
		try {
			// const picture = await uploaderService({});
			const profile = new Profile({
				...profileData,
			});
			return await profile.save();
		} catch (e) {
			return handleError(e);
		}
	}
	async editProfile(id, editData) {
		if (!req.isUserAuth) {
			return handleError('UnAuthorized');
		}
		try {
			const profile = await Profile.findById(id);
			if (profile.owner.toString() !== req.userId) {
				return handleError('UnAuthorized');
			}
			return await Profile.findOneAndUpdate({ _id: id }, editData, {
				useFindAndModify: false,
				new: true,
			});
		} catch (e) {
			return handleError(e);
		}
	}
	async editProfilePicture(id, picture) {}
}

module.exports = ProfileService;
