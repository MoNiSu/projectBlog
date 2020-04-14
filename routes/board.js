const express = require('express');
const mysql = require('mysql');
const session = require('express-session');

const boarddb = require('../config/database_board.js');
const sessionAuth = require('../config/session.js');

const router = express.Router();
const connection = mysql.createConnection(boarddb); 

router.use(session(sessionAuth));

router.get('/', function(req, res, next) {
  if(req.session.username) {
    res.render('board');
  } else {
    res.redirect(`../auth/login`);
  }
});

module.exports = router;