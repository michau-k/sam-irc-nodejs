// NPM modules
const passport = require('passport');
const passportLocal = require('passport-local');

// locals modules
const userModel = require('../models/user');

// Login strategy
passport.use(new passportLocal.Strategy(function(username, password, done){
  userModel.findByUsername(username, function(user) {
    if (!user) {
      console.log('No user was found withe the username:', username);
      return done(null, null);
    }
    else if (user.password != password) {
      console.log('Password does not match')
      return done(null, null);
    }
    console.log('User authenticated:', user.username);
    return done(null, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  userModel.findById(id, function(user) {
    done(null, user);
  });
})

exports.passport = passport;
