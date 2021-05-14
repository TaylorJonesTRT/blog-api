const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  published: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
  comments: { type: Schema.Types.ObjectId, ref: 'Comments', required: true },
});

// Virtual for the posts' URL
// eslint-disable-next-line func-names
PostSchema.virtual('url').get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return `/posts${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);
