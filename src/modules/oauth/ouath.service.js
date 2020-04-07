const axios = require('axios').default;
const { handleError } = require('../../utils/helpers');

const requestForToken = ({ credentials, token_url }) => {
	return axios({
		headers: {
			Accept: 'application/json',
		},
		url: token_url,
		method: 'POST',
		data: {
			...credentials,
		},
	})
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			if (error.response) {
				console.log('toJSON', error.toJSON());
			}
			return handleError(error);
		});
};

const requestForUserAccount = ({ access_token, account_url }) => {
	return axios({
		headers: {
			Accept: 'application/json',
		},
		url: account_url,
		method: 'get',
		params: {
			access_token,
		},
	})
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.log('error requesting for user account', error.toJSON());
			return handleError(error);
		});
};

module.exports = {
	requestForToken,
	requestForUserAccount,
};
