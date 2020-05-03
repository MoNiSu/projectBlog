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
	/* index: 'pages/index', { username: 'A', authLocation: 'signin', auth: 'Signin' }
	error: 'pages/error', { title: 'Error', error: 'err' }
	board: 'pages/board', { title: 'Board', rows: 'A' }
	signin: 'pages/signin', { title: 'auth' }
	signup: 'pages/signup', { title: 'auth' } */
	res.redirect('/1');
	// console.log(req.get('host'));
});

app.get('/:page', function (req, res) {
	console.log(req.params.page);
	res.render('pages/board', { title: 'Board', rows: '', list: 61, nowPage: req.params.page });
});
server.listen(port, function () {
	console.log(' server listening on port ', port);
});

module.exports = app;
