/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json({
    message: 'This is a secure route!',
    user: req.user,
    token: req.query.secret_token,
  });
});

/* GET user profile. */
router.get('/profile', function (req, res, next) {
  res.send(req.user);
});

module.exports = router;
