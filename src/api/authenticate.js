const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/sign-up', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
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
