const axios = require('axios').default;
const { handleError } = require('../../utils/helpers');

const baseUrl = 'https://graph.facebook.com';

const verifyAccessToken = async (input_token) => {
	try {
		const response = await axios({
			method: 'get',
			url: baseUrl + '/debug_token',
			params: {
				input_token,
				access_token: `${process.env.FB_APP_ID}|${process.env.FB_APP_SECRET}`,
			},
		});
		return response.data;
	} catch (e) {
		console.log('error verifying user access token');
		return handleError(e);
	}
};
const getUserData = async (userId, access_token) => {
	try {
		const response = await axios({
			method: 'get',
			url: `${baseUrl}/${userId}`,
			params: {
				fields: 'id,name,email',
				access_token,
			},
		});
		return response.data;
	} catch (e) {
		console.log('error retrieving use data from facebook', e);
		return handleError(e);
	}
};
const authorizeWithFacebook = async ({ codeToken }) => {
	try {
		const {
			data: { user_id, is_valid, scopes },
		} = await verifyAccessToken(codeToken);

		if (!is_valid) {
			return handleError('Invalid Login Credentials');
		}

		const userData = await getUserData(user_id, codeToken);
		return {
			user: {
				providerId: userData.id,
				username: userData.name,
				email: userData.email,
			},
		};
	} catch (e) {
		return handleError(e);
	}
};

module.exports = authorizeWithFacebook;
