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
		connection.query('SELECT * FROM board', function (err, results) {
			if (err) {
				console.log('error occurred', err);
				res.render('error', { title: 'Error', error: err });
			} else {
				res.render('board', { title: 'Board', rows: results.reverse() });
			}
		});
	} else {
		res.redirect('./auth/login');
	}
});

router.post('/', function (req, res) {
	let today = new Date();
	let board = {
		username: req.session.username,
		text: req.body.text,
		created: today
	};

	connection.query('INSERT INTO board SET ?', board, function (err, results) {
		if (err) {
			console.log('error occurred', err);
			res.render('error', { title: 'Error', error: err });
		} else {
			console.log('board success : ', results);
			res.redirect('/board');
		}
	});
});

module.exports = router;
