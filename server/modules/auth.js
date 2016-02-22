// NPM modules
const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcrypt-nodejs');
// locals modules
const userModel = require('../models/user');

var isValidPassword = function(user, password) {
    return bcrypt.compareSync(password, user.password);
};

// Login strategy
passport.use(new passportLocal.Strategy(function(username, password, done){
  userModel.findByUsername(username, function(user) {
    if (!user) {
      console.log('No user was found with the username [ERROR]:', username);
      return done(null, null);
    }
    else if (!isValidPassword(user, password)) {
      console.log('Password does not match [ERROR]')
      return done(null, null);
    }
    console.log('User authenticated [SUCCESS]:', user.username);
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

var newUser = function(req, res) {
  var newUsername = req.body.username;
  var newPassword = req.body.password;

  if (!newUsername || !newPassword ||
      newUsername.length < 3 || newPassword.length < 3) {
        console.log('Signin up action [ERROR]: form was not correct');
        res.redirect('/login/signup/invalid');
        return ;
      }
  userModel.findByUsername(newUsername, function(user) {
    if (user) {
      console.log('Signing up action [ERROR]: username [' + newUsername
      + '] already exists');
      res.redirect('/login/signup/taken');
    }
    else {
      var hashPassword = bcrypt.hashSync(newPassword);
      userModel.createUser(newUsername, hashPassword, function() {
        console.log('Signin up action [SUCCESS]');
        res.redirect('/login/signup/success');
      });
    }
  });
}

exports.passport = passport;
exports.newUser = newUser;
