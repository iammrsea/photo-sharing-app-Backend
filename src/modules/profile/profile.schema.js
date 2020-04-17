const { gql } = require('apollo-server-express');

module.exports = gql`
	type Profile {
		id: ID!
		owner: User!
		about: String!
		picture: String
		profileId: String
	}
	input CreateProfileData {
		owner: ID!
		about: String!
		picture: Upload!
	}
	input EditProfileData {
		description: String!
	}
	input ChangeProfilePicture {
		picture: Upload!
	}

	extend type Query {
		profile(id: ID!): Profile!
		profiles: [Profile!]!
	}
	extend type Mutation {
		createProfile(profileData: CreateProfileData): Profile!
		editProfile(id: ID!, about: String!): Profile
		editProfilePicture(id: ID!, picture: Upload!): Profile
		deleteProfile(id: ID!): Profile
	}
`;
