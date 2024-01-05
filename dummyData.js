const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

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

const listWithMoreThanOneBlog = [
  {
    id: '65968b853af2d8789a3596b7',
    title: 'Node.js Architecture and 12 Best Practices for Node.js Development',
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
    likes: 51,
  },
  {
    id: '6596949b3af2d8789a3596bf',
    title: 'What is the best way to structure a Node.js project?',
    author: 'Sasha Bondar',
    url: 'https://reintech.io/blog/structuring-a-nodejs-project-a-comprehensive-guide-for-software-developers',
    likes: 38,
  },
];

const missingOrNullLikesBlogs = [
  {
    id: '65968b853af2d8789a3596b7',
    title: 'Node.js Architecture and 12 Best Practices for Node.js Development',
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

const containsBlogsWithLikes = [
  {
    id: '65968b853af2d8789a3596b7',
    title: 'Node.js Architecture and 12 Best Practices for Node.js Development',
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

module.exports = {
  blogs,
  listWithOneBlog,
  listWithMoreThanOneBlog,
  missingOrNullLikesBlogs,
  containsBlogsWithLikes,
};
