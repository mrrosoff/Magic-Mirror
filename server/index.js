const fs = require('fs');

const http = require('http');
const https = require('https');
const logger = require('morgan');
const express = require('express');

const app = express();
let credentials, server;
let secure = false;

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

if (secure)
{
	server = https.createServer(credentials, app);
}

else
{
	server = http.createServer(app);
}

app.use((req, res, next) =>
{
	if (!req.secure && secure)
	{
		console.log('Redirecting Insecure Request');
		res.redirect('https://' + req.headers.host + req.url);
	}

	else
	{
		next();
	}
});

app.use(express.static('dist'));

let garageState =
	{
		percentClosed: 100,
		nextDirection: "Up"
	};

app.get('/api/getGarageState', (req, res) =>
{
	res.send(garageState);
});

app.post('/api/garageSwitch', (req, res) =>
{
	let percentClosed = req.body.percentClosed;

	let gpio = require('onoff').Gpio;
	let doorPin = new gpio(4, 'out');

	let timeDown = (9500 * percentClosed / 100) - 1000;
	flipSwitch(doorPin);

	if(percentClosed !== 100)
	{
		setTimeout(() =>
		{
			flipSwitch(doorPin);
			setTimeout(() =>
			{
				flipSwitch(doorPin);
			}, 800)
		}, timeDown + 800);
	}

	res.send(garageState);
});

const flipSwitch = (gpioPin) => setTimeout(gpioPin.writeSync(1), 500);


let port;

if (secure)
{
	port = 8443;
	server.listen(port, () => console.log('HTTPS Server Running on Port ' + port));
}

else
{
	port = 8080;
	server.listen(port, () => console.log('HTTP Server Running on Port ' + port));
}
