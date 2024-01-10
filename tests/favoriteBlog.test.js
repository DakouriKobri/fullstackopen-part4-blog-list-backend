// Local Files
const favoriteBlog = require('../utils/list_helper').favoriteBlog;
const missingOrNullLikesBlogs =
  require('./test_helper_data').missingOrNullLikesBlogs;
const containsBlogsWithLikes =
  require('./test_helper_data').containsBlogsWithLikes;

describe('favorite blog', () => {
  // favoriteBlog's argument is empty array
  test('of empty blogs list', () => {
    const result = favoriteBlog([]);
    expect(result).toBeNull();
  });

  // favoriteBlog's array argument contain items with undefined likes or no likes
  test('of blogs with undefined likes or no likes', () => {
    const result = favoriteBlog(missingOrNullLikesBlogs);
    expect(result).toBeNull();
  });

  // favoriteBlog's argument containing items with likes
  const expectedFavorite = {
    title: 'What is the best way to structure a Node.js project?',
    author: 'Sasha Bondar',
    likes: 38,
  };

  test('of list containing blogs with likes', () => {
    const result = favoriteBlog(containsBlogsWithLikes);
    expect(result).toEqual(expectedFavorite);
  });
});
