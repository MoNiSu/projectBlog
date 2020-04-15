const express = require('express');
const session = require('express-session');

const sessionAuth = require('../config/session.js');

const router = express.Router();

router.use(session(sessionAuth));

router.get('/', function(req, res, next) {
  if(req.session.username) {
    res.render('index', { title: 'Home', username: req.session.username+"님", location: 'logout', value: '로그아웃' });
  } else {
    res.render('index', { title: "Home", username: '', location: 'login', value: '로그인' });
  }
});

module.exports = router;