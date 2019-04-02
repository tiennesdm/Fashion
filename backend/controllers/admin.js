const Trend = require("../models/trend");


exports.createPost =  (req, res, next) => {
  console.log(req.body);
  console.log(req.userData.userId);
  const url = req.protocol + "://" + req.get("host");
  const post = new Trend({
    title: req.body.title,
    content: req.body.content,
    category:req.body.category,
   imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  post
    .save()
    .then(createdPost => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a post failed!"
      });
    });
}
exports.updatePost = (req, res, next) => {
  console.log("userid=",req.userData.userId);
  console.log(req.body);
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Trend({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    category: req.body.category,
    creator: req.userData.userId
  });
  console.log(post.creator);
  Trend.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then(result => {
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate post!"
      });
    });
}
exports.deletePost = (req, res, next) => {
  Trend.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting posts failed!"
      });
    });
}
/*exports.getbyallPostNotbyId = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Trend.find();
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
} */

exports.getbyallPost = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Trend.find({creator :req.userData.userId});
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
exports.getpostbyId = (req, res, next) => {
  Trend.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching post failed!"
      });
    });
}
