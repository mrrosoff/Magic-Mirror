const fs = require('fs');

const http = require('http');
const https = require('https');
const logger = require('morgan');
const express = require('express');

const app = express();
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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (secure) server = https.createServer(credentials, app);
else server = http.createServer(app);

app.use((req, res, next) =>
{
	if (!req.secure && secure) res.redirect('https://' + req.headers.host + req.url);
	else next();
});

app.use(express.static('dist'));

let garageState = { percentClosed: 100, nextDirection: 'Up' };

let validUserName = 'rosoff', validPassword = 'club';

app.get('/api/getGarageState', (req, res) =>
{
	res.send(garageState);
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
		garageState = { ...garageState, nextDirection: garageState.nextDirection === 'Up' ? 'Down' : 'Up'};
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

	res.send(garageState);
});

app.post('/api/login', (req, res) =>
{
	let { username, password } = req.body;

	if (username === validUserName && password === validPassword) res.send(true);
	else res.send(false);
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
