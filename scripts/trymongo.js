const { MongoClient } = require('mongodb');

const url = 'mongodb://mongo/issuetracker';

function testWithCallbacks(callback) {

    console.log('\n--- testWithCallbacks ---\n');
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(function(err, client) {
	if (err) {
	    callback(err);
	    return;
	}
	console.log('Connected to MongoDB');
	
	const db = client.db();

	const collection = db.collection('employees');

	const employee = { id: 9, name: 'A. Callback', age: 23 };
	collection.insertOne(employee, function(err, result) {
	    if (err) {
		client.close();
		callback(err);
		return;
	    }
	    console.log('Result of insert:\n', result.insertedId);

	    collection.find({ _id: result.insertedId })
		      .toArray(function(err, docs) {
			  if (err) {
			      client.close();
			      callback(err);
			      return;
			  }
			  console.log('Result of find:\n', docs);
			  client.close();
			  callback(err);
		      });

	});
	
    });

}

testWithCallbacks(function(err) {
    if(err) {
	console.log(err);
    }
});
