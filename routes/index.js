const express = require('express');
const session = require('express-session');

const sessionAuth = require('../config/session.js');

const router = express.Router();

router.use(session(sessionAuth));

router.get('/', function (req, res) {
	if (req.session.username) {
		res.render('index', { title: 'Home', username: req.session.username + '님', auth: 'logout' });
	} else {
		res.render('index', { title: 'Home', username: '', auth: 'login' });
	}
});

module.exports = router;
