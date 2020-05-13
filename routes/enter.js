const express = require('express');
const session = require('express-session');

const sessionAuth = require('../config/session.js');

const router = express.Router();

router.use(session(sessionAuth));

router.get('/ladder', function (req, res) {
	if (req.session.username) {
		res.render('pages/ladder', { title: 'Ladder' });
	} else {
		res.redirect('./auth/signin');
	}
});

router.get('/wordchain', function (req, res) {
	if (req.session.username) {
		res.render('pages/wordchain', { title: 'Word Chain' });
	} else {
		res.redirect('./auth/signin');
	}
});

module.exports = router;
