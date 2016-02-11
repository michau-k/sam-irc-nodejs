const Sequelize = require('sequelize');
const database = new Sequelize('dev_irc_nodejs', 'dev_account', 'dev_password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

var checkConnection = function(done) {
  database.authenticate().then(
  function() {
    console.log('Connection to database [SUCCESS]');
    done();
  },
  function(err) {
    console.log('Connection to database [ERROR]:', err.message);
  });
};

exports.sequelize = Sequelize;
exports.checkConnection = checkConnection;
exports.db = database;
