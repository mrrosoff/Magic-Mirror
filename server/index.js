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

let garageState = { percentClosed: 100, nextDirection: "Up" };

app.get('/api/getGarageState', (req, res) =>
{
	res.send(garageState);
});

app.post('/api/getLatLngWeatherStats', async (req, res) =>
{
	const axios = require('axios');
	const params = [
		'gust', 'secondarySwellDirection', 'secondarySwellHeight', 'secondarySwellPeriod',
		'swellDirection', 'swellHeight', 'swellPeriod',
		'waveDirection', 'waveHeight', 'wavePeriod', 'windSpeed', 'waterTemperature',
		'windWaveDirection', 'windWaveHeight', 'windWavePeriod'
	].join(',');

	try
	{
		await axios.get(`https://api.stormglass.io/v2/weather/point?lat=${req.body.lat}&lng=${req.body.lng}&params=${params}`,
			{
				headers: { 'Authorization': '39ddd11e-c628-11ea-954a-0242ac130002-39ddd1d2-c628-11ea-954a-0242ac130002' }
			})
		.then(weatherData =>
		{
			res.send(weatherData.data);
		});
	}
	catch(error) { console.log(error); }


});

app.post('/api/garageSwitch', (req, res) =>
{
	let percentClosed = req.body.percentClosed;

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

	res.send(garageState);
});

let port = secure ? 8443 : 8080;

server.listen(port, () =>
{
	console.log('\n\n', 'Server Running on Port ' + port + '\n')
});
