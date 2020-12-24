const { MongoClient } = require('mongodb');

const executeMongoCommand = async (db, collection, command, query) => {

	const uri = `mongodb+srv://mrosoff:ewjQdLwu5FoYXTWJ@garage-pi.vmi9r.mongodb.net/${db}?retryWrites=true&w=majority`;
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	let returnValue;

	try
	{
		await client.connect();
		returnValue = await client.db(db).collection(collection)[command](query);
		await client.close();
	}

	catch (err)
	{
		console.error(err);
	}

	return returnValue;
};

module.exports = executeMongoCommand;
