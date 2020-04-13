const express = require('express');
const session = require('express-session');

const sessionAuth = require('../config/session.js');

const router = express.Router();

router.use(session(sessionAuth));

router.get('/', function(req, res, next) {
  if(req.session.username) {
    res.render('index_login', {username : req.session.username});
  } else {
    res.render('index');
  }
});

module.exports = router;