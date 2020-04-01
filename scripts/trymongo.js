const { MongoClient } = require('mongodb');

const url = 'mongodb://mongo/issuetracker';

const client = new MongoClient(url);
client.connect();
