const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./graphql');

//import module services
const UserService = require('./modules/user/user.service');

require('dotenv').config();

// const user = gql`
// 	type User {
// 		id: ID!
// 		username: String!
// 	}
// `;
// const query = gql`
// 	type Query {
// 		user(id: ID!): User!
// 	}
// `;
// const typeDefs = [user, query];
// const users = [
// 	{ id: 1, username: 'Jon Doe' },
// 	{ id: 2, username: 'Jerry Grey' },
// 	{ id: 3, username: 'Mary Doe' },
// ];
// const resolvers = {
// 	Query: {
// 		user: (_, { id }) => users.find((user) => user.id === +id),
// 	},
// };

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => ({
		userService: new UserService(),
	}),
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

mongoose
	.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((value) => {
		console.log(`Successfully connected to database: ${process.env.DB_HOST}`);
		return httpServer.listen(process.env.PORT || 5000);
	})
	.then(() => {
		console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
	})
	.catch((error) => {
		console.log(error);
	});
