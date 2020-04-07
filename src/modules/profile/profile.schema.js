const { gql } = require('apollo-server-express');

module.exports = gql`
	type Profile {
		id: ID!
		owner: User!
		description: String!
		picture: String
		profileId: String
	}
	input CreateProfileData {
		owner: ID!
		description: String!
		picture: Upload!
	}
	input EditProfileData {
		description: String!
	}
	input ChangeProfilePicture {
		pictureId: String!
		picture: Upload!
	}

	extend type Query {
		profile(id: ID!): Profile!
	}
	extend type Mutation {
		createProfile(profileData: CreateProfileData): Profile!
		editProfile(id: ID!, editData: EditProfileData): Profile
		editProfilePicture(id: ID!, editData: ChangeProfilePicture): Profile
	}
`;
