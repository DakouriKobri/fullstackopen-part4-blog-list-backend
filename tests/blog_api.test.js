// NPM Packages
const mongoose = require('mongoose');
const supertest = require('supertest');

// Local Files
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('unique identifier of each blog post is id', async () => {
  const response = await api.get('/api/blogs');

  for (const blog of response.body) {
    expect(blog.id).toBeDefined();
  }
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Top 10 Node.js Debugging Tips to Debug Like a Pro',
    author: 'Lou',
    url: 'https://stackify.com/node-js-debugging-tips/',
    likes: 41,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain(newBlog.title);
});

test('missing likes defaults to 0', async () => {
  const newBlog = {
    title: 'Understanding memory leaks in Node.js apps',
    // eslint-disable-next-line quotes
    author: "Faith Ng'etich",
    url: 'https://blog.logrocket.com/understanding-memory-leaks-node-js-apps/',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const savedBlog = blogsAtEnd.find((blog) => blog.title === newBlog.title);
  expect(savedBlog.likes).toEqual(0);
});

afterAll(async () => {
  await mongoose.connection.close();
});
