// NPM Packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Local Files
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
const logger = require('./utils/logger');

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

app.use('/api/blogs', blogsRouter);

module.exports = app;
