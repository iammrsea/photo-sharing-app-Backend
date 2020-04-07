const { OAuth2Client } = require('google-auth-library');
const { handleError } = require('../../utils/helpers');

const verifyToken = (token) => {
	const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

	return client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID,
	});
};
const authorizeWithGoogle = async ({ codeToken }) => {
	// console.log('code token', codeToken);
	try {
		const ticket = await verifyToken(codeToken);
		const payload = ticket.getPayload();

		return {
			user: {
				providerId: payload['sub'],
				email: payload['email'],
				username: payload['name'],
			},
		};
	} catch (e) {
		console.log('error occurred while authorizing with google', e.message);
		return handleError(e);
	}
};
module.exports = authorizeWithGoogle;
