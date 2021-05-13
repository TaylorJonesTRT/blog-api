const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  name: { type: String, required: true, maxLength: 75 },
  date: { type: Date, default: Date.now },
  comment: { type: String, required: true, maxLength: 1000 },
});

module.exports = mongoose.model('Comment', CommentSchema);
