const Trend = require("../models/trend");
exports.getbyallWomenPost = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Trend.find({category :"Women"});
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Trend.count();
    })
    .then(count => {
      console.log(count);
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });

    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
}
