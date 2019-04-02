const Category_name = require("../models/category_name");
//const id = 4;
exports.createCategoryPost =  (req, res, next) => {
  console.log(req.body);
  console.log(req.body.categoryName);
  const category = new Category_name({
         category_name:req.body.categoryName,
  });
  category
    .save()
    .then(created_category_post => {
      console.log(created_category_post);
      res.status(201).json({
        message: "Created Category Post Success Fully",
        created_category_post: {
          ...created_category_post,
          id: created_category_post._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating Category Post Failed"
      });
    });
}
exports.getCategoryName = (req, res, next) => {
  Category_name.find({})
    .then(category_name_post => {
      if (category_name_post) {
        res.status(200).json(category_name_post);
      } else {
        res.status(404).json({ message: "Category_Name not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Category_name Fectch  failed!"
      });
    });
}
exports.updateCategory = (req, res, next) => {

  console.log(req.body);
  //console.log("userid=",req.userData.userId);
 // console.log(req.body);
//  let imagePath = req.body.imagePath;
/*  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }  */
   const category = new Category_name(
    {
      _id:req.body.id,
      category_name:req.body.categoryName
    }
);
console.log(this.category);
 // console.log(post.creator);
  Category_name.updateOne({ _id: req.params.id }, category)
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
exports.deleteCategory = (req, res, next) => {
  Category_name.deleteOne({ _id: req.params.id })
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
exports.getCategoryById = (req, res, next) => {
  Category_name.findById(req.params.id)
    .then(category => {
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: "Category not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching post failed!"
      });
    });
  }
