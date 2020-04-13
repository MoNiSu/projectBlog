const express = require('express');
const mysql = require('mysql');
const session = require('express-session');

const authdb = require('../config/database_auth.js');
const connection = mysql.createConnection(authdb);  

const sessionAuth = require('../config/session.js');

const router = express.Router();

router.use(session(sessionAuth));

router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

router.get('/logout', function(req, res, next) {
  delete req.session.username;
  req.session.save(function() {
    res.redirect('../')
  });
});

router.get('/signup', function(req, res, next) {
  res.render('auth/signup');
});

router.post('/login', function(req, res) {
  var login = {
    id : req.body.id,
    password : req.body.password
  };

  connection.query('SELECT * FROM users WHERE id = ?', [login.id], function(error, results, fields) {
    if(error) {
      console.log("error ocurred", error);
      res.render('error');
    } else {
      if(results.length > 0) {
        var db = results[0];
        if(db.password == login.password) {
          console.log('login success : ', db);
          req.session.username = db.username;
          req.session.save(function() {
            res.redirect('../');
          });
        } else {
          res.render('auth/login_fail_1');
        }
      } else {
        res.render('auth/login_fail_2');
      }
    }
  });
});

router.post('/signup', function(req, res) {
  var today = new Date();
  var signup = {
    id : req.body.id,
    username : req.body.username,
    password : req.body.password,
    created : today
  };

  connection.query('INSERT INTO users SET ?', signup, function(error, results, fields) {
    if(error) {
      console.log("error ocurred", error);
      res.render('auth/signup_fail');
    } else {
      console.log('signup success : ', results);
      //req.session.username = signup.username;
      //  req.session.save(function() {
      //    res.render('auth/signup_success', {username : signup.username});
      //  });
    }
  });
});

module.exports = router;