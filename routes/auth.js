const express = require('express');
const mysql = require('mysql');
const session = require('express-session');

const authdb = require('../config/database_auth.js');
const sessionAuth = require('../config/session.js');

const router = express.Router();
const connection = mysql.createConnection(authdb);

router.use(session(sessionAuth));

router.get('/login', function (req, res) {
	res.render('auth/login', { title: 'Login' });
});

router.get('/logout', function (req, res) {
	req.session.destroy(function () {
		req.session;
		res.redirect('../');
	});
});

router.get('/signup', function (req, res) {
	res.render('auth/signup', { title: 'Signup' });
});

router.post('/login', function (req, res) {
	var login = {
		id: req.body.id,
		password: req.body.password
	};

	connection.query('SELECT * FROM users WHERE id = ?', [login.id], function (err, results) {
		if (err) {
			console.log('error occurred', err);
			res.render('error', { title: 'Error', error: err });
		} else {
			if (results.length > 0) {
				var db = results[0];
				if (db.password === login.password) {
					console.log('login success : ', db);
					req.session.username = db.username;
					req.session.save(function () {
						res.redirect('../');
					});
				} else {
					res.render('error', { title: 'Login Error', error: '비밀번호가 올바르지 않습니다.' });
				}
			} else {
				res.render('error', { title: 'Login Error', error: '아이디가 존재하지 않습니다.' });
			}
		}
	});
});

router.post('/signup', function (req, res) {
	var today = new Date();
	var signup = {
		id: req.body.id,
		username: req.body.username,
		password: req.body.password,
		created: today
	};

	connection.query('INSERT INTO users SET ?', signup, function (err, results) {
		if (err) {
			console.log('error occurred', err);
			res.render('error', { title: 'Signup Error', error: '아이디 혹은 닉네임이 존재합니다.' });
		} else {
			console.log('signup success : ', results);
			req.session.username = signup.username;
			req.session.save(function () {
				res.redirect('../');
			});
		}
	});
});

module.exports = router;
