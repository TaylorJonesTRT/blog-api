const mongoose = requier('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  published: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
  comments: { type: Schema.Types.ObjectId, ref: 'Comments', required: true },
});

// Virtual for the posts' URL
PostSchema.virtual('url').get(function () {
  return `/posts${this._id}`;
});
