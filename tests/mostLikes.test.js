// Local Files
const mostLikes = require('../utils/list_helper').mostLikes;
const blogs = require('./test_helper_data').blogs;
const missingOrNullLikesBlogs =
  require('./test_helper_data').missingOrNullLikesBlogs;

describe('Most likes blog', () => {
  // Empty blogs
  test('of empty blog', () => {
    const result = mostLikes([]);
    expect(result).toBeNull();
  });

  // Blogs with undefined or no likes
  test('of blogs with undefined likes or no likes', () => {
    const result = mostLikes(missingOrNullLikesBlogs);
    expect(result).toBeNull();
  });

  // Blogs with undefined or no likes
  const expectedTopBlog = {
    author: 'Edsger W. Dijkstra',
    likes: 12,
  };

  test('of list containing blogs with likes', () => {
    const result = mostLikes(blogs);
    expect(result).toEqual(expectedTopBlog);
  });
});
