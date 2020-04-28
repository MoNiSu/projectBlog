const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

/* Modification required for each model
windows_wsl : 8080, ubuntu: 3000 mac: */
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
	/* index: 'index', { username: 'A', auth: 'signin' }
	error: 'error', { title: 'Error', error: 'err' }
	board: 'board', { title: 'Board', rows: 'A' }
	signin: 'auth/signin'
	signup: 'auth/signup' */
	res.render('board', { rows: '' });
	// console.log(req.get('host'));
});

app.get('/bb', function (req, res) {
	res.redirect('/');
});

server.listen(port, function () {
	console.log(' server listening on port ', port);
});

module.exports = app;
