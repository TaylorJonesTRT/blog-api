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
exports.createNewPost = [
  // need to setup all the steps to be taken when it comes to creating a new post
  // Validating and sanitization of fields
  body('title', 'Title must not be empty').trim().isLength({ min: 1 }).escape(),
  body(
    'datePublished',
    'Not a valid date selection. Did you try time traveling backwards?',
  )
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body('postBody', 'You must write something to make a post')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Proccessing the request after validation and sanitization
];

exports.deletePostByID = function (req, res, next) {};

exports.updatePostByID = function (req, res, next) {};

exports.getPostByID = function (req, res, next) {};
