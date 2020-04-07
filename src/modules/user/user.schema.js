const { gql } = require('apollo-server-express');

module.exports = gql`
	type User {
		id: ID!
		providerId: ID
		username: String
		email: String
		createdAt: String
		# profile: Profile!
		# sharedPhotos(first: Int, after: String, filter: PhotoFilter, sorting: SortData): PhotoConnection!
		# photosTagged(first: Int, after: String, filter: PhotoFilter, sorting: SortData): PhotoConnection!
	}

	type UserConnection {
		edges: [Edge!]!
		pageInfo: PageInfo!
		totalCount: Int
	}

	type AuthResponse {
		userId: ID!
		token: String!
	}

	input CreateUserData {
		username: String!
		email: String!
		password: String
		profilePicture: String
	}

	input FormSigninUserData {
		username: String
		email: String
		password: String!
	}
	input EditUserData {
		username: String
		email: String
	}
	input CreateManyUsers {
		username: String
		email: String
		password: String!
		profilePicture: String
	}
	input UserFilter {
		username: String
	}
	input ProviderSignInData {
		codeToken: String!
		providerName: ProviderName
	}
	enum UserSortableField {
		username
		createdAt
		email
	}
	enum ProviderName {
		facebook
		github
		twitter
		google
		linkedin
	}
	input UserSortData {
		sortOrder: SortDirection = DESCENDING
		sortBy: UserSortableField = createdAt
	}
	extend type Query {
		user(id: ID!): User!
		users(first: Int, after: String, sorting: UserSortData, filter: UserFilter): UserConnection
		searchUsers(first: Int, after: String, sorting: UserSortData, searchText: String): UserConnection
	}

	extend type Mutation {
		formSignUp(newUser: CreateUserData): User!
		editUser(id: ID!, editUserData: EditUserData): User
		deleteUser(id: ID!): User
		formSignIn(signinData: FormSigninUserData): AuthResponse
		providerSignIn(signinData: ProviderSignInData): AuthResponse
		createManyUsers(users: [CreateManyUsers!]!): [User]
		deleteManyUsers: [User]
	}
`;
