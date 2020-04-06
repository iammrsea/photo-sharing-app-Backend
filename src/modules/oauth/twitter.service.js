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
		console.log('access_token from github', access_token);
		const user = await requestForUserAccount({ access_token, account_url });
		console.log('github user', user);
		return { user, access_token };
	} catch (e) {
		console.log('error authorizing with github', e);
		return handleError(e);
	}
};

module.exports = authorizeWithGithub;
