const { gql } = require('apollo-server-express');

module.exports = gql`
	type Like {
		id: ID!
	}
`;
