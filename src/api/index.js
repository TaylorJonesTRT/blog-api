const express = require('express');

const passport = require('passport');

const authenticate = require('./authenticate');

const router = express.Router();

const test = require('./test');

router.get('/', (req, res) => {
  res.json({
    message: 'Testing',
  });
});

router.use('/auth', authenticate);
router.use('/test', passport.authenticate('jwt', { session: false }), test);

module.exports = router;
