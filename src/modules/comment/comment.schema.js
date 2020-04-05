const { gql } = require('apollo-server-express');

module.exports = gql`
	type Comment {
		id: ID!
	}
`;
