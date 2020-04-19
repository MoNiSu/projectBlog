const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

/* Modification required for each model
windows_wsl : 8080, ubuntu: 3000 mac: */
const PORT = 8080;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
	res.render('index', { title: 'Home', username: '', auth: 'login' });
});

server.listen(PORT, function () {
	console.log(' server listening on port 8080 ');
});

module.exports = app;
