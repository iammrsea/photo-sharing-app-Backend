const { handleError } = require('../../utils/helpers');
const { requestForToken, requestForUserAccount } = require('./ouath.service');

const token_url = 'https://github.com/login/oauth/access_token';
const account_url = `https://api.github.com/user`;

const authorizeWithGithub = async ({ code }) => {
	const credentials = {
		client_id: process.env.GITHUB_CLIENT_ID,
		client_secret: process.env.GITHUB_CLIENT_SECRET,
		code,
	};
	try {
		const { access_token } = await requestForToken({ credentials, token_url });
		const gitUser = await requestForUserAccount({ access_token, account_url });

		return {
			user: {
				providerId: gitUser.id,
				username: gitUser.login,
				email: gitUser.email,
			},
			token: access_token,
		};
	} catch (e) {
		console.log('error authorizing with github', e.message);
		// console.log('error response', e.response);
		return handleError(e);
	}
};

module.exports = authorizeWithGithub;
