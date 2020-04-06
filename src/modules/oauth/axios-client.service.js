const axios = require('axios').default;

module.exports = () =>
	axios.create({
		headers: {
			Accept: 'application/json',
		},
	});
