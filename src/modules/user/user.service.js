const bcryt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { handleError } = require('../../utils/helpers');
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
			handleError(e);
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
			handleError(e);
		}
	}

	async editUser(user) {
		try {
			const update = {
				email: user.email,
				username: user.username,
			};
			const editedUser = await User.findOneAndUpdate({ _id: user.id }, update, {
				useFindAndModify: false,
			});
			return editedUser;
		} catch (error) {
			handleError(error);
		}
	}
	createManyUsers = (users) => {
		return User.insertMany(users);
	};
	deleteManyUsers = () => {
		return User.deleteMany();
	};
	async createUser(username, email, password, pubsub) {
		try {
			const verifyEmail = await User.findOne({ email: email });
			if (verifyEmail) {
				return handleError('User already exists');
			}
			const verifyUsername = await User.findOne({ username: username });
			if (verifyUsername) {
				return handleError('User already exists');
			}
			const hashedPassword = await bcryt.hash(password, 13);
			const newUser = new User({
				email: email,
				username: username,
				password: hashedPassword,
			});
			pubsub.publish('USER_CREATED', { userCreated: newUser });
			const savedUser = await newUser.save();
			savedUser.password = null;

			return savedUser;
		} catch (error) {
			return handleError(error);
		}
	}
	async deleteUser(id) {
		try {
			const deletedUser = await User.findByIdAndDelete({ _id: id });
			if (deleteUser) {
				deletedUser.password = null;
				return deletedUser;
			}
			return deleteUser;
		} catch (error) {
			return handleError(error);
		}
	}
	async signIn(username, password) {
		try {
			let userExists = await User.findOne({ username: username });
			if (!userExists) {
				handleError('Invalid Login credentials');
			}
			let match = await bcryt.compare(password, userExists.password);
			if (!match) {
				handleError('Invalid Login credentials');
			}
			const token = await jwt.sign(
				{ userId: userExists._id, username: userExists.username },
				process.env.SECRET,
				{ expiresIn: '2h' }
			);
			return {
				userId: userExists._id.toString(),
				token: token,
				tokenExpiration: 2,
			};
		} catch (error) {
			handleError(error);
		}
	}
}

module.exports = UserService;
