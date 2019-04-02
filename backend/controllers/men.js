const Trend = require("../models/trend");
exports.getbyallMenPost = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const category = +req.query.category;
  const postQuery = Trend.find({category :req.query.category});
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
   //   console.log(fetchedPosts.count());
   //  return fetchedPosts.count();
      return Trend.count({category:req.query.category});
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


