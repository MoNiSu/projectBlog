const express = require('express');
const session = require('express-session');

const sessionAuth = require('../config/session.js');

const router = express.Router();

router.use(session(sessionAuth));

router.get('/', function (req, res) {
	if (req.session.username) {
		res.render('pages/index', { title: 'Home', username: req.session.username + '님', authLocation: 'signout', auth: '로그아웃' });
	} else {
		res.render('pages/index', { title: 'Home', username: '', authLocation: 'signin', auth: '로그인' });
	}
});

module.exports = router;
