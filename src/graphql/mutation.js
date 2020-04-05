const { gql } = require('apollo-server-express');

module.exports = gql`
	type Mutation {
		_empty: String
	}
`;
