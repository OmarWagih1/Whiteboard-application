var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/user');
mongoose.connect("mongodb://Damn:Damnit1!2@ds127736.mlab.com:27736/unar");
/* GET home page. */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/login',
  failureRedirect: '/signup',
  failureFlash: true,
}));
module.exports = router;
