// NPM Packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('express-async-errors');

// Local Files
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const app = express();

mongoose.set('strictQuery', false);

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info('Server connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connecting server to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

app.use('/api/login', loginRouter);
app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

app.use(middleware.errorHandler);

module.exports = app;
