const express = require('express');
const serveIndex = require('serve-index');
const http = require('http');
const config = require('./config.js');

const app = express();

app.use(express.static('./webroot'));
app.use(serveIndex('./webroot', { icons: true }));

app.use(function (req, res, next) {
	console.log('404: Page not Found', req.url);
	next();
});

const httpServer = http.createServer(app);

httpServer.listen(80, () => {
	console.log('HTTP server started on port 80');
});

if (!config.httpOnly) {
	const https = require('https');
	const fs = require('fs');

	const privateKey = fs.readFileSync(config.privateKeyFilename, 'utf8');
	const certificate = fs.readFileSync(config.certificateFilename, 'utf8');
	const credentials = { key: privateKey, cert: certificate };
	const httpsServer = https.createServer(credentials, app);

	httpsServer.listen(443, () => {
		console.log('HTTP server started on port 443');
	});
}



