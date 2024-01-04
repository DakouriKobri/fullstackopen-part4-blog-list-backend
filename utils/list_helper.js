// eslint-disable-next-line no-unused-vars
function dummy(blogs) {
  return 1;
}

function totalLikes(blogs) {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.reduce(reducer, 0);
}

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

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes,
};
