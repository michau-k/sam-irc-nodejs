// NPM modules
const cluster = require('cluster');

// local modules
const popstring = require('../modules/popstring');

process.send({message: popstring.getString()});
