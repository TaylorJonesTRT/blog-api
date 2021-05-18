/* eslint-disable import/order */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');

require('dotenv').config();
require('./passport')(passport);

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1:27017/blog-api';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message:
      'Blog Api - A blog built off of RESTful ideas with only the features you need to get going.',
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
