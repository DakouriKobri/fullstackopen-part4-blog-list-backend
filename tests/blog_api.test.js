// NPM Packages
const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');

// Local Files
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('when there is initially some blogs saved', () => {
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
});

describe('addition of a new blog', () => {
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

  test('missing title returns status code 400', async () => {
    const newBlog = {
      author: 'John Doe',
      url: 'http://example.com/johndoes-blog',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('missing url returns status code 400', async () => {
    const newBlog = {
      title: 'The Art of coding RESTful APIs',
      author: 'John Doe',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

describe('deletion of a blog', () => {
  test('delete a blog returns statusCode 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    console.log('blog to delete:', blogToDelete);

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('editing a blog', () => {
  test('successful blog update returns status code 200 with valid data', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const blogUpdate = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 10,
    };

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogUpdate).expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd[0];
    expect(updatedBlog.likes).toEqual(10);
  });
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secretly', 10);
    const user = new User({
      username: 'root',
      passwordHash,
    });

    await user.save();
  });

  test('creation succeeds with fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'aya',
      name: 'Aya Kanh',
      password: 'P4ssword',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with status code 400 and "`username` is required." as message if username is not provided', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'Aya Kanh',
      password: 'P4ssword',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username`');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

test('creation fails with status code 400 and "`password` is required." as message if password is not provided', async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: 'aya',
    name: 'Aya Kanh',
  };

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  expect(result.body.error).toBe('`password` is required.');

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toEqual(usersAtStart);
});

test('creation fails with status code 400 and "`username` must be at least 3 characters long." as message if username is less than 3 characters long', async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: 'ay',
    name: 'Aya Kanh',
    password: 'P4ssword',
  };

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  expect(result.body.error).toContain('`username`');

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toEqual(usersAtStart);
});

test('creation fails with status code 400 and "`password` must be at least 3 characters long." as message if password is less than 3 characters long', async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: 'aya',
    name: 'Aya Kanh',
    password: 'P4',
  };

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  expect(result.body.error).toBe(
    '`password` must be at least 3 characters long.'
  );

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toEqual(usersAtStart);
});

test('create fails with status code 400 and "`username` is already taken." as message, if the username already exists in the database', async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: 'root',
    name: 'Aya Kanh',
    password: 'P4ssword',
  };

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  expect(result.body.error).toContain('expected `username` to be unique.');

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toEqual(usersAtStart);
});

afterAll(async () => {
  await mongoose.connection.close();
});
