/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function (email, password, done) {
      return User.findOne({ email, password }).then((user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Email not found in our database' });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) {
            return next(err);
          }
          if (res) {
            // passwords match, log the user in
            return done(null, user, { message: 'Logged In Successfully!' });
            // eslint-disable-next-line no-else-return
          } else {
            // passwords don't match
            return done(null, false, { message: 'Incorrect password' });
          }
        });
        return done(null, user, { message: 'Logged In Successfully' });
      });
    },
  ),
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  // eslint-disable-next-line no-undef
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

router.post('/sign-up', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      // eslint-disable-next-line no-shadow
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });
});

router.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/log-in',
  }),
);

router.get('log-out', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
