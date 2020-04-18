const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer, PubSub } = require('apollo-server-express');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./graphql');
const authorizationService = require('./modules/authorization/authorization.service');

require('dotenv').config();

//import  services module
const services = require('./modules/dataservices/data.service');

//import loader module
const loaders = require('./modules/dataloaders/loader.service');

const app = express();

const pubsub = new PubSub();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(authorizationService);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({
		services,
		loaders,
		req,
		pubsub,
	}),
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

mongoose
	.connect(process.env.PROD_DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((value) => {
		console.log(`Successfully connected to database: ${process.env.PROD_DB_HOST}`);
		return httpServer.listen(process.env.PORT || 5000);
	})
	.then(() => {
		console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
	})
	.catch((error) => {
		console.log(error);
	});
