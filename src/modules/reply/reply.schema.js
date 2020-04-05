const { gql } = require('apollo-server-express');

module.exports = gql`
	type Reply {
		id: ID!
	}
`;
