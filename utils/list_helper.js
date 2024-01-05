// NPM Packages
const _ = require('lodash');

// eslint-disable-next-line no-unused-vars
function dummy(blogs) {
  return 1;
}

// Get sum of all likes

function totalLikes(blogs) {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.reduce(reducer, 0);
}

// Get most favored blog

function favoriteBlog(blogs) {
  const blogsWithLikes = blogs.filter(
    (blog) => blog.likes !== undefined && blog.likes !== null
  );

  if (blogs.length === 0 || blogsWithLikes.length === 0) {
    return null;
  }

  const topLikes = Math.max(...blogsWithLikes.map((blog) => blog.likes));

  const blogWithHighestLikes = blogs.find((blog) => blog.likes === topLikes);

  const favBlog = {
    title: blogWithHighestLikes.title,
    author: blogWithHighestLikes.author,
    likes: blogWithHighestLikes.likes,
  };

  return favBlog;
}

// Get author with highest number of blogs

// turn object into array
function objectToArray(object, keyLabel, valueLabel) {
  let array = [];
  const value = valueLabel.toLowerCase();
  const key = keyLabel.toLowerCase();
  for (const i in object) {
    array = array.concat({ [key]: i, [value]: object[i] });
  }
  return array;
}

function mostBlogs(blogs) {
  const authorsObject = _.countBy(_.flatMap(blogs), 'author');
  const authors = objectToArray(authorsObject, 'author', 'blogs');

  if (authors.length === 0) return null;

  const highestBlogCount = Math.max(...authors.map((author) => author.blogs));
  const topAuthor = authors.find((author) => author.blogs === highestBlogCount);

  return topAuthor;
}

// Get author with highest blog's likes

function mostLikes(blogs) {
  const mostLikesBlog = _.maxBy(blogs, 'likes');

  if (mostLikesBlog === undefined) {
    return null;
  }

  const topBlog = {
    author: mostLikesBlog.author,
    likes: mostLikesBlog.likes,
  };

  return topBlog;
}

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes,
};
