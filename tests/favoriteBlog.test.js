// Local Files
const favoriteBlog = require('../utils/list_helper').favoriteBlog;

describe('favorite blog', () => {
  // favoriteBlog's argument is empty array
  test('of empty blogs list', () => {
    const result = favoriteBlog([]);
    expect(result).toBeNull();
  });

  // favoriteBlog's array argument contain items with undefined likes or no likes
  const missingOrNullLikesBlogs = [
    {
      id: '65968b853af2d8789a3596b7',
      title:
        'Node.js Architecture and 12 Best Practices for Node.js Development',
      author: 'Mukul Khanna',
      url: 'https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development',
      likes: null,
    },
    {
      id: '659694493af2d8789a3596bd',
      title:
        'A Comprehensive Guide to Structuring Node.js Projects: Best Practices and Example',
      author: 'Akshat Gadodia',
      url: 'https://medium.com/@akshatgadodia/a-comprehensive-guide-to-structuring-node-js-projects-best-practices-and-example-44eb493920ca',
    },
  ];

  test('of blogs with undefined likes or no likes', () => {
    const result = favoriteBlog(missingOrNullLikesBlogs);
    expect(result).toBeNull();
  });

  // favoriteBlog's argument containing items with likes
  const containsBlogsWithLikes = [
    {
      id: '65968b853af2d8789a3596b7',
      title:
        'Node.js Architecture and 12 Best Practices for Node.js Development',
      author: 'Mukul Khanna',
      url: 'https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development',
      likes: null,
    },
    {
      id: '659694493af2d8789a3596bd',
      title:
        'A Comprehensive Guide to Structuring Node.js Projects: Best Practices and Example',
      author: 'Akshat Gadodia',
      url: 'https://medium.com/@akshatgadodia/a-comprehensive-guide-to-structuring-node-js-projects-best-practices-and-example-44eb493920ca',
    },
    {
      id: '6596949b3af2d8789a3596bf',
      title: 'What is the best way to structure a Node.js project?',
      author: 'Sasha Bondar',
      url: 'https://reintech.io/blog/structuring-a-nodejs-project-a-comprehensive-guide-for-software-developers',
      likes: 38,
    },
    {
      id: '659692743af2d8789a3596b9',
      title: 'Node.js project architecture best practices',
      author: 'Piero Borrelli',
      url: 'https://blog.logrocket.com/node-js-project-architecture-best-practices',
      likes: 5,
    },
  ];

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
