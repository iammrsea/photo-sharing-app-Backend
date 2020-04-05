const { gql } = require('apollo-server-express');

module.exports = gql`
	type Subscription {
		_empty: String
	}
`;
