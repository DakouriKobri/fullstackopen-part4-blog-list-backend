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

afterAll(async () => {
  await mongoose.connection.close();
});
