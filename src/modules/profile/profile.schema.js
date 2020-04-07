const { gql } = require('apollo-server-express');

module.exports = gql`
	type Profile {
		id: ID!
		owner: User!
		description: String!
		picture: String
	}
	input CreateProfileData {
		owner: ID!
		description: String!
		picture: String!
	}
	input EditProfileData {
		description: String
		picture: String
	}

	extend type Query {
		profile(id: ID!): Profile!
	}
	extend type Mutation {
		createProfile(profileData: CreateProfileData): Profile!
		editProfile(editData: EditProfileData): Profile
	}
`;
