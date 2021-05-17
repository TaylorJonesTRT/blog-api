/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');

require('./passport');

const router = express.Router();

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

router.post('/login', function (req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right, we could not find what you were looking for',
        user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user, 'secretsheee', { expiresIn: '1d' });
      return res.json({ user, token });
    });
  })(req, res);
});

router.get('log-out', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
