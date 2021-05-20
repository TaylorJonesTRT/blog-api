const express = require('express');
const Post = require('../models/post');

const app = express();

app.get('/', (req, res, next) => {
  res.json({
    message: 'route is working properly',
    user: req.user,
  });
});

module.exports = app;
