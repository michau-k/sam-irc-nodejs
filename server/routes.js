const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;

var setUpRoutes = function(app, passport) {
  app.get('/', ensureLoggedIn('/login'), function(req, res) {
    res.render('pages/chat');
  });

  app.get('/login', ensureLoggedOut('/'), function(req, res) {
    res.render('pages/login');
  });

  app.post('/login', passport.authenticate('local', {
        successRedirect : '/',
        failureRedirect : '/login'
  }));

  app.get('/chat', ensureLoggedIn('/login'), function(req, res) {
    res.render('pages/chat');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page not found !');
  });
}

exports.setUpRoutes = setUpRoutes;
