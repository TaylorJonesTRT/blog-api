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

// commented the below out as cannot sign up using rest/api endpoint due
// to timeout error. For this api will have a test user populated into the db by
// hand like how I did it in the localLibrary project

// router.post('/sign-up', (req, res, next) => {
//   bcrypt.hash(req.body.password, 1, (err, hashedPassword) => {
//     if (err) {
//       return next(err);
//     }
//     const user = new User({
//       username: req.body.username,
//       password: hashedPassword,
//     }).save((err) => {
//       if (err) {
//         return next(err);
//       }
//     });
//   });
//   res.send.json('Account Created');
// });

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An error occurred.');

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, 'TOP_SECRET');

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.get('log-out', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
