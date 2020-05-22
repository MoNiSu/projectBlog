const express = require('express');
const mysql = require('mysql');
const session = require('express-session');

const dbConfig = require('../config/database.js');
const sessionAuth = require('../config/session.js');

const router = express.Router();
const connection = mysql.createPool(dbConfig);

router.use(session(sessionAuth));

router.get('/signin', function (req, res) {
	if (req.session.username) {
		res.redirect('../');
	} else {
		res.render('pages/signin', { title: 'Sign In' });
	}
});

router.get('/signout', function (req, res) {
	if (req.session.username) {
		req.session.destroy(function () {
			req.session;
			res.redirect('../');
		});
	} else {
		res.render('pages/error', { title: 'Error', error: '올바르지 않은 접근입니다.' });
	}
});

router.get('/signup', function (req, res) {
	if (req.session.username) {
		res.redirect('../');
	} else {
		res.render('pages/signup', { title: 'Sign Up' });
	}
});

router.post('/signin', function (req, res) {
	let signin = {
		userid: req.body.id,
		password: req.body.password
	};

	connection.query('SELECT * FROM users WHERE userid = ?', [signin.userid], function (err, results) {
		if (err) {
			console.log('error occurred', err);
			res.render('pages/error', { title: 'Error', error: err });
		} else {
			if (results.length > 0) {
				let db = results[0];
				if (db.password === signin.password) {
					console.log('signin success : ', db.username);
					req.session.username = db.username;
					req.session.save(function () {
						res.redirect('../');
					});
				} else {
					res.render('pages/error', { title: 'Error', error: '비밀번호가 올바르지 않습니다.' });
				}
			} else {
				res.render('pages/error', { title: 'Error', error: '아이디가 존재하지 않습니다.' });
			}
		}
	});
});

router.post('/signup', function (req, res) {
	let today = new Date();

	let signup = {
		userid: req.body.id,
		username: req.body.username,
		password: req.body.password,
		created: today
	};

	connection.query('INSERT INTO users SET ?', signup, function (err, results) {
		if (err) {
			console.log('error occurred', err);
			res.render('pages/error', { title: 'Error', error: '아이디 혹은 닉네임이 존재합니다.' });
		} else {
			console.log('signup success : ', signup, results);
			req.session.username = signup.username;
			req.session.save(function () {
				res.redirect('../');
			});
		}
	});
});

module.exports = router;
