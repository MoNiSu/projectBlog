const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.id) {
    res.render('board');
  } else {
    res.render(`./auth/needlogin`)
  }
});

module.exports = router;