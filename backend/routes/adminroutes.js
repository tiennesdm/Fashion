const express = require("express");
const fileverify = require("../middleware/imagevalidation");
const postcontroller = require("../controllers/admin");


const checkAuth = require("../middleware/check-auth");

const router = express.Router();



router.post(
  "",
  checkAuth,
  fileverify,
  postcontroller.createPost
);

router.put(
  "/:id",
  checkAuth,
  fileverify,
  postcontroller.updatePost

);

router.get("",checkAuth, postcontroller.getbyallPost );

router.get("/:id", checkAuth ,postcontroller.getpostbyId );

router.delete("/:id", checkAuth,  postcontroller.deletePost );
//router.get("/", postcontroller.getbyallPostNotbyId);

module.exports = router;
