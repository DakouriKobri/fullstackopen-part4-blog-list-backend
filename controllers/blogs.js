// NPM Packages
const { Router } = require('express');

// Local Files
const Blog = require('../models/Blog');

const blogRouter = Router();

blogRouter.get('/', (request, response) => {
  Blog.find({}).then((fetchedBlogs) => {
    response.json(fetchedBlogs);
  });
});

blogRouter.post('/', (request, response) => {
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

module.exports = blogRouter;
