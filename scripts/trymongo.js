const { MongoClient } = require('mongodb');

const url = 'mongodb://mongo/issuetracker';

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(function(err, client) {
    const db = client.db();
});
