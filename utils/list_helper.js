// eslint-disable-next-line no-unused-vars
function dummy(blogs) {
  return 1;
}

function totalLikes(blogs) {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.reduce(reducer, 0);
}

module.exports = {
  dummy,
  totalLikes,
};
