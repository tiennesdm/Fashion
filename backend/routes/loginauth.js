const express = require("express");
const signupandlogin = require("../controllers/login");




const router = express.Router();

router.post("/signup", signupandlogin.signupuser );

router.post("/login", signupandlogin.loginuser);

module.exports = router;
