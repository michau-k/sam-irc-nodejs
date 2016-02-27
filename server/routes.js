const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;

var setUpRoutes = function(app, auth) {
  app.get('/', ensureLoggedIn('/login'), function(req, res) {
    res.render('pages/chat', {username: req.user.username});
  });

  app.get('/login', ensureLoggedOut('/chat'), function(req, res) {
    res.render('pages/login', {message: '', error: false});
  });

  app.get('/login/out', ensureLoggedOut('/chat'), function(req, res) {
    res.render('pages/login', {message: 'You have been logged out.', error: false});
  });

  app.get('/login/signin/failure', ensureLoggedOut('/chat'), function(req, res) {
    res.render('pages/login', {message: 'Wrong username or password.', error: true});
  });

  app.get('/login/signup/invalid', ensureLoggedOut('chat'), function(req, res) {
    res.render('pages/login', {message: 'Username and password must have at least 3 characters.', error: true});
  });

  app.get('/login/signup/taken', ensureLoggedOut('chat'), function(req, res) {
    res.render('pages/login', {message: 'This username already exists.', error: true});
  });

  app.get('/login/signup/success', ensureLoggedOut('chat'), function(req, res) {
    res.render('pages/login', {message: 'You can now sign in to chat.', error: false});
  });

  app.post('/signin', auth.passport.authenticate('local', {
        successRedirect : '/chat',
        failureRedirect : '/login/signin/failure'
  }));

  app.post('/signup', auth.newUser);

  app.get('/chat', ensureLoggedIn('/login'), function(req, res) {
    res.render('pages/chat', {username: req.user.username});
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login/out');
  });

  app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page not found !');
  });
}

exports.setUpRoutes = setUpRoutes;
