const express = require('express');
const session = require('express-session');

const router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.username) {
    res.render('board');
  } else {
    res.redirect(`./auth/login`);
  }
});

module.exports = router;