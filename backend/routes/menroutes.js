const express = require("express");
const fileverify = require("../middleware/imagevalidation");
const postcontroller = require("../controllers/men");


const checkAuth = require("../middleware/check-auth");

const router = express.Router();


router.get("/", postcontroller.getbyallMenPost );



module.exports = router;
