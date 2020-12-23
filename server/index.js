const fs = require('fs');

const http = require('http');
const https = require('https');

const express = require('express');
const logger = require('morgan');

const validate = require('express-jsonschema').validate;
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
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

const API = require("./api/RESTfulAPI");

API.map(({path, callback}) => app.post('/api' + path, callback));

let port = secure ? 8443 : 8080;

server.listen(port, () =>
{
	console.log('\n', 'Server Running on Port ' + port, '\n')
});
