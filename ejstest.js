const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

/* Modification required for each model
windows_wsl : 8080, ubuntu: 3000 mac: */
const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
	/* index: 'index', { title: 'Home', username: 'A', auth: 'login' }
	error: 'error', { title: 'Error', error: 'err' }
	board: 'board', { title: 'Board', rows: 'A' }
	login: 'auth/login', { title: 'Login' }
	signup: 'auth/signup', { title: 'Signup' } */
	res.render('board', { title: 'Board', rows: '' });
});

server.listen(PORT, function () {
	console.log(' server listening on port ', PORT);
});

module.exports = app;
