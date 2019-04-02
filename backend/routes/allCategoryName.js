const express = require("express");
// const fileverify = require("../middleware/imagevalidation");
const categorycontroller = require("../controllers/Category");
const checkAuth = require("../middleware/check-auth");


 // const checkAuth = require("../middleware/check-auth");

const router = express.Router();


router.post("", categorycontroller.createCategoryPost );
router.get("", categorycontroller.getCategoryName);
router.put(
  "/:id", categorycontroller.updateCategory
);
router.delete("/:id",categorycontroller.deleteCategory);
router.get("/:id", categorycontroller.getCategoryById );



module.exports = router;
