const express = require('express');
// const mysql = require('mysql');
const http = require('http');
const path = require('path');
// const xml2js = require('xml2js');


// const dbConfig = require('./config/database.js');

// const connection = mysql.createPool(dbConfig);

const app = express();
const server = http.createServer(app);


/* Modification required for each model
windows_wsl : 8080, ubuntu: 3000 mac: 3000 */
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
	// res.redirect('/1');
	// console.log(req.get('host'));
	res.render('pages/wordchain', { title: 'E' });
});

/* app.get('/:page', function (req, res) {
	connection.query('SELECT * FROM board', function (err, results) {
		if (err) {
			console.log('error occured', err);
			res.render('pages/error', { title: 'Error', error: err });
		} else {
			let rows = results.reverse();
			if (!rows[req.params.page * 10 - 1]) {
				res.render('pages/board', { title: 'Board', rows: rows.slice((req.params.page - 1) * 10, rows.length), list: rows.length, nowPage: req.params.page });
			} else {
				res.render('pages/board', { title: 'Board', rows: rows.slice((req.params.page - 1) * 10, req.params.page * 10), list: rows.length, nowPage: req.params.page });
			}
		}
	});
}); */

server.listen(port, function () {
	console.log(' server listening on port ', port);
});

module.exports = app;
