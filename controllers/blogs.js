// NPM Packages
const blogsRouter = require('express').Router();

// Local Files
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const usersInDb = await User.find({});
  const randomUserIndex = Math.floor(Math.random() * usersInDb.length);
  const randomUserId = usersInDb[randomUserIndex].id;

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ?? 0,
    user: randomUserId,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { title, author, url, likes } = request.body;

  const blog = { title, author, url, likes };

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  response.json(updatedBlog);
});

module.exports = blogsRouter;
