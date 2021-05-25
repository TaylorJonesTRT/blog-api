const express = require('express');

const passport = require('passport');

const authenticate = require('./authenticate');

const router = express.Router();

const posts = require('./posts');
const test = require('./test');

router.get('/', (req, res) => {
  res.json({
    message: 'Testing',
  });
});

router.use('/auth', authenticate);
router.use('/posts', passport.authenticate('jwt', { session: false }), posts);
// router.use('/test', passport.authenticate('jwt', { session: false }), test);

module.exports = router;
