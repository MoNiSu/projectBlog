const express = require('express');
const session = require('express-session');

const sessionAuth = require('../config/session.js');

const router = express.Router();

router.use(session(sessionAuth));

router.get('/', function (req, res) {
	if (req.session.username) {
		res.render('index', { username: req.session.username + '님', authLocation: 'signout', auth: 'Signout' });
	} else {
		res.render('index', { username: '', authLocation: 'signin', auth: 'Signin' });
	}
});

module.exports = router;
