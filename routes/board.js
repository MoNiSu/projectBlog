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
		res.redirect('/1');
	} else {
		res.redirect('./auth/signin');
	}
});

router.get('/:page', function (req, res) {
	if (req.session.username) {
		connection.query(
			`SELECT * FROM board WHERE idx BETWEEN ${(req.params.page - 1) * 10 + 1} AND ${(req.params.page * 10 - 1) * 10 + 1}`,
			function (err, results) {
				if (err) {
					console.log('error occured', err);
					res.render('error', { error: err });
				} else {
					res.render('board', { rows: results.reverse() });
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
			res.render('error', { error: err });
		} else {
			console.log('board success : ', results);
			res.redirect('/board');
		}
	});
});

module.exports = router;
