const async = require('async');
const { body, validationResult } = require('express-validator');
const Post = require('../models/post');
const User = require('../models/user');

// Return every post in the database showing most recent posted first
exports.showAllPosts = function (req, res, next) {
  Post.find()
    .sort([['date', 'descending']])
    .exec((err, listPosts) => {
      if (err) {
        return next(err);
      }
      return res.json({
        posts: listPosts,
      });
    });
};
exports.createNewPost = function (req, res, next) {
  return;
};

exports.deletePostByID = function (req, res, next) {};

exports.updatePostByID = function (req, res, next) {};

exports.getPostByID = function (req, res, next) {};
