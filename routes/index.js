const express = require('express');
const session = require('express-session');

const router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.username) {
    res.render('index_logged_in', {username : req.session.username});
  } else {
    res.render('index');
  }
});

module.exports = router;