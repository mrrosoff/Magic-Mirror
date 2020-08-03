const fs = require('fs');

const http = require('http');
const https = require('https');

const express = require('express');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('dist'));

let credentials, server, secure = false;

try
{
	const privateKey = fs.readFileSync('privkey.pem', 'utf8');
	const certificate = fs.readFileSync('cert.pem', 'utf8');
	const ca = fs.readFileSync('chain.pem', 'utf8');
	credentials = { key: privateKey, cert: certificate, ca: ca };
	secure = true;
}
catch(e) {}

if (secure) server = https.createServer(credentials, app);
else server = http.createServer(app);

app.use((req, res, next) =>
{
	if (!req.secure && secure) res.redirect('https://' + req.headers.host + req.url);
	else next();
});

const { MongoClient } = require('mongodb');

const executeMongoCommands = async (db, collection, command, query) => {

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

app.post('/api/createAccount', (req, res) =>
{
	let { username } = req.body;

	executeMongoCommands('Rosoff-Club', 'Login-Data', 'findOne', {username: username})
	.then((r) =>
	{
		if(!r)
		{
			executeMongoCommands('Rosoff-Club', 'Login-Data', 'insertOne', req.body)
			.then(r => res.send({accountCreationSuccess: true, message: "Account Created Successfully"}));
		}

		else res.send({accountCreationSuccess: false, message: "Account With Username Already Exists!"})
	});
});

app.post('/api/login', (req, res) =>
{
	let { username, password } = req.body;
	executeMongoCommands('Rosoff-Club', 'Login-Data', 'findOne', {username: username})
	.then((r) =>
	{
		if (!r)
		{
			res.send({loginSuccess: false, message: "No Account Found"});
		}

		else if (r.password === password)
		{
			res.send({loginSuccess: true, message: "Login Successful"});
		}

		else
		{
			res.send({loginSuccess: false, message: "Invalid Password"});
		}
	});
});

app.post('/api/garageSwitch', (req, res) =>
{
	let { percentClosed } = req.body;

	let gpio = require('onoff').Gpio;
	let doorPin = new gpio(4, 'out');
	doorPin.writeSync(1);

	const flipSwitch = () =>
	{
		doorPin.writeSync(0);
		setTimeout(() => doorPin.writeSync(1), 500);
	};

	flipSwitch();

	if(percentClosed !== 100)
	{
		setTimeout(() =>
		{
			flipSwitch();
			setTimeout(() =>
			{
				flipSwitch();
			}, 2000 + 1000 * (90 - percentClosed) / 10)
		}, 9000);
	}
});

app.post('/api/getLatLngWeatherStats', (req, res) =>
{
	let { lat, lng } = req.body;
	const params = [
		'airTemperature', 'cloudCover', 'currentDirection', 'currentSpeed',
		'gust', 'humidity', 'swellDirection', 'swellHeight', 'swellPeriod',
		'secondarySwellPeriod', 'secondarySwellDirection', 'secondarySwellHeight',
		'waterTemperature', 'waveDirection', 'waveHeight', 'wavePeriod', 'windDirection', 'windSpeed',
	].join(',');

	let url = `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`;

	try
	{
		const axios = require('axios');

		axios.get(url, { headers: { Authorization: '39ddd11e-c628-11ea-954a-0242ac130002-39ddd1d2-c628-11ea-954a-0242ac130002' }})
		.then(weatherData => res.send(weatherData.data))
		.catch(err => console.error(err));
	}
	catch(error) {}
});

let port = secure ? 8443 : 8080;

server.listen(port, () =>
{
	console.log('\n', 'Server Running on Port ' + port, '\n')
});
