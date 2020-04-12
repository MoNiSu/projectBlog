const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const router = express.Router();

const dbconfig = require('../config/database_auth.js');
const connection = mysql.createConnection(dbconfig);  


router.get('/login', function(req, res, next) {
  res.render('auth/login');
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
        if(results[0].password == login.password) {
          console.log('login success : ', results[0]);
          res.render('auth/login_success', {username : results[0].username});
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
      res.render('auth/signup_success', {username : signup.username});
    }
  });
});

module.exports = router;