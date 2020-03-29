const express = require('express');
const { ApolloServer } = require('apollo-server-express');

let aboutMessage = "Issue Tracker API v1.0";

typeDefs = `
type Query {
  about: String!
}
type Mutation {
  setAboutMessage(message: String!): String
}
`;

const resolvers = {
    Query: {
	about: () => aboutMessage,
    },
    Mutation: {
	setAboutMessage,
    }
};

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

const app = express();

app.use(express.static('public'));

apolloServer.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function () {
  console.log('App started on port 3000');
});
