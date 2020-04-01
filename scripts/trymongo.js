const { MongoClient } = require('mongodb');

const url = 'mongodb://mongo/issuetracker';

async function testWithAsync() {

    console.log('\n--- testWithAsync ---\n');
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {

	await client.connect();
	console.log('Connected to MongoDB');
	
	const db = client.db();
	const collection = db.collection('employees');

	const employee = { id: 9, name: 'A. Callback', age: 23 };
	const result = await collection.insertOne(employee);
	console.log('Result of insert:\n', result.insertedId);

	const docs = await collection.find({ _id: result.insertedId }).toArray();
	console.log('Result of find:\n', docs);

    } catch(err) {
	console.log(err);
    } finally {
	client.close();
    }

}

testWithAsync();
