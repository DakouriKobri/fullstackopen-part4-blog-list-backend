function countBlogsPerAuthor(array, name) {
  const reducer = (sum, item) => (item.author === name ? sum + 1 : sum);
  const blogsCount = array.reduce(reducer, 0);
  return blogsCount;
}

const authorsList = blogs.map((blog) => blog.author);
const uniqueAuthorsList = [...new Set(authorsList)];
console.log('authorsList:', authorsList);
console.log('uniqueAuthorsList:', uniqueAuthorsList);

const authors = uniqueAuthorsList.map((author) => {
  const blogger = {
    author: author,
    blogs: countBlogsPerAuthor(blogs, author),
  };
  return blogger;
});

if (authors.length === 0) {
  console.log('authors:', authors);
  return null;
}

const topAuthorBlogCount = Math.max(...authors.map((author) => author.blogs));
const topAuthor = authors.find((author) => author.blogs === topAuthorBlogCount);

console.log('authors:', authors);
console.log('topAuthorBlogCount:', topAuthorBlogCount);
console.log('topAuthor:', topAuthor);
