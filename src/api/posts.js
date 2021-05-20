const express = require('express');
const Post = require('../models/post');

const app = express();

app.get('/', (req, res, next) => {
  Post.find()
    .sort([['date', 'descending']])
    .exec((err, listPosts) => {
      if (err) {
        return next(err);
      }
      res.json({
        posts: listPosts,
      });
    });
});

app.post('/', (req, res, next) => {});

module.exports = app;
