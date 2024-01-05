// Local Files
const mostBlogs = require('../utils/list_helper').mostBlogs;
const blogs = require('../dummyData').blogs;

describe('Most blogs author', () => {
  // Blogs is empty
  test('of empty blog', () => {
    const result = mostBlogs([]);
    expect(result).toBeNull();
  });

  // Blogs is not empty
  const expectedAuthor = {
    author: 'Robert C. Martin',
    blogs: 3,
  };

  test('of author with most blogs', () => {
    const result = mostBlogs(blogs);
    expect(result).toEqual(expectedAuthor);
  });
});
