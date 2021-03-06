const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.String, ref: 'User', required: true },
  published: { type: Boolean, default: true },
  datePublished: { type: Date, default: Date.now },
  postBody: { type: String, required: true },
  // comments: { type: Schema.Types.ObjectId, ref: 'Comments', required: true },
});

// Virtual for the posts' URL
// eslint-disable-next-line func-names
PostSchema.virtual('url').get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return `/posts${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);
