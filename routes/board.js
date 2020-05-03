const express = require('express');
const mysql = require('mysql');
const session = require('express-session');

const dbConfig = require('../config/database.js');
const sessionAuth = require('../config/session.js');

const router = express.Router();
const connection = mysql.createPool(dbConfig);

router.use(session(sessionAuth));

router.get('/', function (req, res) {
	if (req.session.username) {
		res.redirect('./board/1');
	} else {
		res.redirect('./auth/signin');
	}
});

router.get('/:page', function (req, res) {
	if (req.session.username) {
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
	} else {
		res.redirect('./auth/signin');
	}
});

router.post('/', function (req, res) {
	let today = new Date();
	today.setHours(today.getHours() + 9);

	let board = {
		username: req.session.username,
		text: req.body.text,
		created: today
	};

	connection.query('INSERT INTO board SET ?', board, function (err, results) {
		if (err) {
			console.log('error occurred', err);
			res.render('pages/error', { title: 'Error', error: err });
		} else {
			console.log('board success : ', results);
			res.redirect('/board');
		}
	});
});

module.exports = router;
