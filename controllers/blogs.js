// NPM Packages
const blogsRouter = require('express').Router();

// Local Files
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', (request, response) => {
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

module.exports = blogsRouter;
