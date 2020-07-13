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

// Create API URLs Here

app.post('/api/postRequest', (req, res) => console.log(req.body));



let port;

if (secure)
{
	port = 8443
	server.listen(port, () => console.log('HTTPS Server Running on Port ' + port));
}

else
{
	port = 8080
	server.listen(port, () => console.log('HTTP Server Running on Port ' + port));
}
