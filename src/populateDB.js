/* eslint-disable no-shadow */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
console.log('Uploading a test user into the database, so that you may access the api');
const userArgs = process.argv.slice(2);

const async = require('async');
const mongoose = require('mongoose');
const User = require('./models/user');

const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

const user = [];

function userCreate(username, password, cb) {
  userdetail = { username: username, password: password };

  const user = new User(userdetail);

  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`Test User Added: ${user}`);
    userArgs.push(user);
    cb(null, user);
  });
}

function createUser(cb) {
  async.series([
    function (callback) {
      userCreate('test', 'verygoodpassword', callback);
    },
  ]);
}

async.series([createUser], function (err, results) {
  mongoose.connection.close();
});
