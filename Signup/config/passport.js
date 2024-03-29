var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req,email,password, done) {
    process.nextTick(function() {
        User.findOne({ 'email':  req.body.email }, function(err, user) {
            if (err)
                return done(err);
            if (user) {
              return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
              var newUser = new User();
              newUser.email = req.body.email;
              newUser.password = newUser.generateHash(req.body.password);
              if(req.body.teacherCode == "123"){
                newUser.teacher = true;
              }
              else{
                  newUser.teacher = false;
              }
              newUser.save(function(err) {
                if (err)
                  throw err;
                return done(null, newUser);
              });
            }
          });
    });
  }));

};