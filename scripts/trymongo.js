const { MongoClient } = require('mongodb');

const url = 'mongodb://mongo/issuetracker';

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(function(err, client) {
    const db = client.db();

    const collection = db.collection('employees');

    const employee = { id: 5, name: 'A. Callback', age: 23 };
    collection.insertOne(employee, function(err, result) {
	console.log('Result of insert:\n', result.insertedId);
    });
});
