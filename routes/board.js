const express = require('express');
const session = require('express-session');

const sessionAuth = require('../config/session.js');

const router = express.Router();

router.use(session(sessionAuth));

router.get('/', function(req, res, next) {
  if(req.session.username) {
    res.render('board');
  } else {
    res.redirect(`../auth/login`);
  }
});

module.exports = router;