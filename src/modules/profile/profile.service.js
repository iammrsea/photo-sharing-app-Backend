const { handleError } = require('../../utils/helpers');
const Profile = require('./profile.model');

class ProfileService {
	async createProfile(profileData, req, imageService) {
		if (!req.isUserAuth) {
			return handleError('UnAuthorized');
		}
		try {
			const { owner, about } = profileData;
			const { createReadStream } = await profileData.picture;
			const sourceStream = createReadStream();
			const { secure_url } = await imageService.uploadImage({ sourceStream });

			const profile = new Profile({
				owner,
				about,
				picture: secure_url,
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
	async getUserProfile(owner) {
		console.log('owner id', owner);
		const result = await Profile.findOne({ owner });
		console.log('result', result);
		return result;
	}
	async editProfilePicture(id, picture) {}
	getAllProfiles() {
		return Profile.find({}).populate('owner').exec();
	}
	deleteProfile(id) {
		return Profile.findByIdAndRemove(id);
	}
}

module.exports = ProfileService;
