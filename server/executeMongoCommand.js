const { MongoClient } = require('mongodb');

const executeMongoCommand = async (db, collection, command, query) => {

	const uri = `mongodb+srv://mrosoff:ewjQdLwu5FoYXTWJ@garage-pi.vmi9r.mongodb.net/${db}?retryWrites=true&w=majority`;
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

	try
	{
		await client.connect();
		return await client.db(db).collection(collection)[command](query);
	}

	catch (err)
	{
		console.log(err);
	}

	finally
	{
		await client.close();
	}
};

module.exports = executeMongoCommand;
