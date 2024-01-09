// NPM Packages
const blogsRouter = require('express').Router();

// Local Files
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ?? 0,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { title, author, url, likes } = request.body;

  console.log('request body:', request.body);

  const blog = { title, author, url, likes };

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  response.json(updatedBlog);
});

module.exports = blogsRouter;
