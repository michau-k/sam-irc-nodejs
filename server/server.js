const express = require('express');
const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/login', function(req, res) {
    res.render('pages/login');
});

app.get('/chat', function(req, res) {
    res.render('pages/chat');
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(port, function() {
    console.log("Server is on, now listening on port [" + port + "]");
});
