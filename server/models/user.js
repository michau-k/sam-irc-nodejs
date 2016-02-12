const Sequelize = require('sequelize');
const database = require('../modules/database');

var User = database.db.define('user', {
  username: {
    type: database.sequelize.STRING,
    allowNull: false
  },
  password: {
    type: database.sequelize.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true
});

database.checkConnection(function() {
  User.sync().then(
    function (err) {
      console.log('Sync User model with database [SUCCESS]');
    },
    function (err) {
      console.log('Sync User model with database [ERROR]:', err.message);
    });
});

var findByUsername = function(username, done) {
  User.findOne({where: {username: username}}).then(done);
};

var findById = function(id, done) {
  User.findById(id).then(done);
};

var createUser = function(username, password, done) {
  User.create({username: username, password: password}).then(
    done
  );
}

exports.findByUsername = findByUsername;
exports.findById = findById;
exports.createUser = createUser;
