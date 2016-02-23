// NPM modules
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

// local modules
const routes = require('./routes');
const auth = require('./modules/auth');
const socket = require('./modules/socket')

const app = express();
const port = 8080;
const sessionMiddleware = expressSession({
  secret: 'super-secret-irc',
  resave: false,
  saveUninitialized: false
});

// set up the view engine to use ejs
app.set('view engine', 'ejs');

// set up the default directory to look for files
app.use(express.static(__dirname + '/public'));

// tell the server to use those middlewares for proper use of passport
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(sessionMiddleware);

// initialize passport for the server
app.use(auth.passport.initialize());
app.use(auth.passport.session());

// initialize all routes
routes.setUpRoutes(app, auth);

const server = app.listen(port, function() {
    console.log("Server is on, now listening on port [" + port + "]");
});

socket.setUpSockets(server);
