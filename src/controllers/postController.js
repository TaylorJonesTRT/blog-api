/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-else-return */
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

  (req, res, next) => {
    const activeUser = User.findById(req.user._id, function (err, user) {
      if (err) {
        return next(err);
      } else {
        return user;
      }
    });

    const errors = validationResult(req);

    const blogPost = new Post({
      title: req.body.title,
      author: req.user.username,
      published: req.body.published,
      datePublished: req.body.datePublished,
      postBody: req.body.postBody,
    });

    if (!errors.isEmpty()) {
      res.json({
        errors,
      });
    } else {
      blogPost.save(function (err) {
        if (err) {
          return next(err);
        }
        return res.json({
          message: 'Post has been submitted!',
          blogPost,
        });
      });
    }
  },
];

exports.deletePostByID = function (req, res, next) {};

exports.updatePostByID = function (req, res, next) {};

exports.getPostByID = function (req, res, next) {};
