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

function mostBlogs(blogs) {
  const countBlogsPerAuthor = (array, name) => {
    const reducer = (sum, item) => (item.author === name ? sum + 1 : sum);
    return array.reduce(reducer, 0);
  };

  const authorsList = blogs.map((blog) => blog.author);
  const uniqueAuthorsList = [...new Set(authorsList)];

  const authors = uniqueAuthorsList.map((author) => {
    const blogger = {
      author,
      blogs: countBlogsPerAuthor(blogs, author),
    };
    return blogger;
  });

  if (authors.length === 0) return null;

  const topAuthorBlogCount = Math.max(...authors.map((author) => author.blogs));

  const topAuthor = authors.find(
    (author) => author.blogs === topAuthorBlogCount
  );

  return topAuthor;
}

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  totalLikes,
};
