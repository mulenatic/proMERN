const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');

let aboutMessage = "Issue Tracker API v1.0";

const issuesDB = [
    {
	id: 1, status: 'New', owner: 'Ravan', effort: 5,
	created: new Date('2019-01-15'), due: undefined,
	title: 'Error in console when clicking Add',
    },
    {
	id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
	created: new Date('2019-01-16'), due: new Date('2019-02-01'),
	title: 'Missing bottom border on panel',
    },
];

const resolvers = {
    Query: {
	about: () => aboutMessage,
	issueList,
    },
    Mutation: {
	setAboutMessage,
    }
};

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

function issueList() {
    return issuesDB;
}

const apolloServer = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
});

const app = express();

app.use(express.static('public'));

apolloServer.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function () {
  console.log('App started on port 3000');
});
