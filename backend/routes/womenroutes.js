const express = require("express");
const fileverify = require("../middleware/imagevalidation");
const postcontroller = require("../controllers/women");


const checkAuth = require("../middleware/check-auth");

const router = express.Router();


router.get("/", postcontroller.getbyallWomenPost );


module.exports = router;
