/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup Successful!',
      user: req.user,
    });
  },
);

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An error occurred.');

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { username: user.username, id: user._id };
        const token = jwt.sign({ username: user.username, id: user._id }, 'TOP_SECRET');

        return res.json({
          body,
          token,
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// not sure if this actually does anything or not... I think not
// router.get('log-out', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });

module.exports = router;
