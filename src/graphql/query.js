const { gql } = require('apollo-server-express');

module.exports = gql`
	type Query {
		_empty: String
	}
`;
