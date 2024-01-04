// NPM Packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Local Files
const Blog = require('./models/blog');

const app = express();

mongoose.set('strictQuery', false);

const mongoUrl = process.env.MONGODB_URI;
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

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((fetchedBlogs) => {
    response.json(fetchedBlogs);
  });
});

app.post('/api/blogs', (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
  });

  blog.save().then((savedBlog) => {
    response.status(201).json(savedBlog);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
