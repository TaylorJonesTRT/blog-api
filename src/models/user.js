const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 35 },
  password: { type: String, required: true, minLength: 8 },
});

module.exports = mongoose.model('User', UserSchema);
