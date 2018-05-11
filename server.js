const express = require('express');
const serveIndex = require('serve-index');
const fs = require('fs');
const http = require('http');
const https = require('https');
const config = require('./config.js');
const privateKey = fs.readFileSync(config.privateKeyFilename, 'utf8');
const certificate = fs.readFileSync(config.certificateFilename, 'utf8');

const credentials = { key: privateKey, cert: certificate };
const app = express();

app.use(express.static('./webroot'));
app.use(serveIndex('./webroot', { icons: true }));

app.use(function (req, res, next) {
	console.log('404: Page not Found', req.url);
	next();
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, function () {
	console.log('HTTP server started on port 80');
});
httpsServer.listen(443, function () {
	console.log('HTTP server started on port 443');
});
