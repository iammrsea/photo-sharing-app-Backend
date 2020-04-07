const { handleError } = require('../../utils/helpers');

class ProfileService {
	createProfile(profileData, req) {
		if (!req.isUserAuth) {
			return handleError('UnAuthorized');
		}
	}
}

module.exports = ProfileService;
