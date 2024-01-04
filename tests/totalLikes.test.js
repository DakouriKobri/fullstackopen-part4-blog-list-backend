// Local Files
const totalLikes = require('../utils/list_helper').totalLikes;

describe('total likes', () => {
  // totalLikes argument is an empty array
  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0);
  });

  // totalLikes argument is an array with only one blog
  const listWithOneBlog = [
    {
      _id: '659694493af2d8789a3596bd',
      title:
        'A Comprehensive Guide to Structuring Node.js Projects: Best Practices and Example',
      author: 'Akshat Gadodia',
      url: 'https://medium.com/@akshatgadodia/a-comprehensive-guide-to-structuring-node-js-projects-best-practices-and-example-44eb493920ca',
      likes: 51,
      __v: 0,
    },
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(51);
  });

  // totalLikes argument is an array with more than one blog
  const listWithMoreThanOneBlog = [
    {
      _id: '65968b853af2d8789a3596b7',
      title:
        'Node.js Architecture and 12 Best Practices for Node.js Development',
      author: 'Mukul Khanna',
      url: 'https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development',
      likes: null,
      __v: 0,
    },
    {
      _id: '659694493af2d8789a3596bd',
      title:
        'A Comprehensive Guide to Structuring Node.js Projects: Best Practices and Example',
      author: 'Akshat Gadodia',
      url: 'https://medium.com/@akshatgadodia/a-comprehensive-guide-to-structuring-node-js-projects-best-practices-and-example-44eb493920ca',
      likes: 51,
      __v: 0,
    },
    {
      _id: '6596949b3af2d8789a3596bf',
      title: 'What is the best way to structure a Node.js project?',
      author: 'Sasha Bondar',
      url: 'https://reintech.io/blog/structuring-a-nodejs-project-a-comprehensive-guide-for-software-developers',
      likes: 38,
      __v: 0,
    },
  ];

  test('of a bigger list is calculated right', () => {
    const result = totalLikes(listWithMoreThanOneBlog);
    expect(result).toBe(89);
  });
});
