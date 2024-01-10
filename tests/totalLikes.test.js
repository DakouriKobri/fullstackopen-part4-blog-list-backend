// Local Files
const totalLikes = require('../utils/list_helper').totalLikes;
const listWithOneBlog = require('./test_helper_data').listWithOneBlog;
const listWithMoreThanOneBlog =
  require('./test_helper_data').listWithMoreThanOneBlog;

describe('total likes', () => {
  // totalLikes argument is an empty array
  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0);
  });

  // totalLikes argument is an array with only one blog
  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(51);
  });

  // totalLikes argument is an array with more than one blog
  test('of a bigger list is calculated right', () => {
    const result = totalLikes(listWithMoreThanOneBlog);
    expect(result).toBe(89);
  });
});
