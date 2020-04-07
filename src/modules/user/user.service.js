const bcryt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { handleError } = require('../../utils/helpers');
const { githubService, facebookService, twitterService, googleService, linkedinService } = require('../oauth');
const dataTransformer = require('../data-transformer/data-transformer.service');
const queryBuilder = require('../query-builder/query-builder.service');
const User = require('./user.model');

class UserService {
	constructor() {}

	//Read operation which is memoized and batched
	static getUserByIds(ids) {
		return User.find({ _id: { $in: ids } });
	}

	//Basic CRUD operations
	async getUsers({ first, after, filter: { username }, sorting: { sortOrder, sortBy } }) {
		try {
			let query = User.find({});
			if (username) {
				query.where({ username });
				// query = User.find({ $text: { $search: searchText } });
			}
			const build = queryBuilder(query, { first, after, sortBy, sortOrder });
			query = build.query;

			const data = await query.exec();
			const totalCount = await User.estimatedDocumentCount();
			return {
				...dataTransformer({
					data,
					limit: build.limit,
					sortOrder: build.sort,
					sortBy: build.sortingBy,
				}),
				totalCount,
			};
		} catch (e) {
			console.log('error gettting users');
			return handleError(e);
		}
	}
	async searchUsers({ first, after, searchText, sorting: { sortOrder, sortBy } }) {
		try {
			let query = User.find({});
			if (searchText) {
				query = User.find({ $text: { $search: searchText } });
			}
			const build = queryBuilder(query, { first, after, sortBy, sortOrder });
			query = build.query;

			const data = await query.exec();
			// const totalCount = await User.find({ username: searchText }).countDocuments();
			return {
				...dataTransformer({
					data,
					limit: build.limit,
					sortOrder: build.sort,
					sortBy: build.sortingBy,
				}),
			};
		} catch (e) {
			console.log('error searching users', e);
			return handleError(e);
		}
	}

	async editUser(id, userData, req) {
		if (!req.isUserAuth) {
			return handleError('UnAuthorized');
		}
		try {
			const user = await User.findById(id);
			if (user._id.toString() !== req.userId) {
				return handleError('UnAuthorized');
			}
			return await User.findOneAndUpdate({ _id: id }, userData, {
				useFindAndModify: false,
				new: true,
			});
		} catch (error) {
			return handleError(error);
		}
	}
	createManyUsers = (users) => {
		return User.insertMany(users);
	};
	deleteManyUsers = () => {
		return User.deleteMany();
	};
	async signUpUsingForm({ username, email, password }, pubsub) {
		try {
			const emailAlreadExists = await User.findOne({ email: email });
			if (emailAlreadExists) {
				return handleError('User already exists');
			}
			const hashedPassword = await bcryt.hash(password, 13);
			const newUser = new User({
				email: email,
				username: username,
				password: hashedPassword,
			});
			// pubsub.publish('USER_CREATED', { userCreated: newUser });
			const savedUser = await newUser.save();
			savedUser.password = null;

			return savedUser;
		} catch (error) {
			return handleError(error);
		}
	}
	async providerSignIn(signinData) {
		const { codeToken, providerName } = signinData;

		const { user } = await this.signIn({ codeToken, providerName });

		const authUser = await User.findOneAndUpdate(
			{ providerId: user.providerId },
			{ ...user },
			{
				upsert: true,
				new: true,
				useFindAndModify: false,
			}
		);
		const token = await this.signToken(authUser._id, user.username);
		return {
			token,
			userId: authUser._id.toString(),
		};
	}
	signIn({ codeToken, providerName }) {
		switch (providerName) {
			case 'github':
				return githubService({ codeToken });
			case 'facebook':
				return facebookService({ codeToken });
			case 'google':
				return googleService({ codeToken });
			case 'twitter':
				return twitterService({ codeToken });
			case 'linkedin':
				return linkedinService({ codeToken });
			default:
				return handleError('Invalide provider name supplied');
		}
	}
	async deleteUser(id, req) {
		if (!req.isUserAuth) {
			return handleError('UnAuthorized');
		}
		try {
			const user = await User.findById(id);
			if (user._id.toString() !== req.userId) {
				return handleError('UnAuthorized');
			}
			return await User.findByIdAndDelete({ _id: id });
		} catch (error) {
			return handleError(error);
		}
	}
	signToken(userId, username) {
		return jwt.sign(
			{
				userId,
				username,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '72h' }
		);
	}
	async formSignIn({ username, email, password }) {
		try {
			let userExists = await User.findOne({ username });
			if (!userExists) {
				userExists = await User.findOne({ email });
			}
			if (!userExists) {
				return handleError('Invalid Login credentials');
			}
			let match = await bcryt.compare(password, userExists.password);
			if (!match) {
				return handleError('Invalid Login credentials');
			}
			const token = await this.signToken(userExists._id, userExists.username);
			return {
				userId: userExists._id.toString(),
				token: token,
				// tokenExpiration: 2,
			};
		} catch (error) {
			return handleError(error);
		}
	}
}

module.exports = UserService;
