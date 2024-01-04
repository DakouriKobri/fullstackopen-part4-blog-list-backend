// NPM Packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Local Files
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');

const app = express();

mongoose.set('strictQuery', false);

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('Server connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting server to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

module.exports = app;
