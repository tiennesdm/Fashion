const express = require("express");
const signupandlogin = require("../controllers/expressSession");
const router = express.Router();
router.post("/signup", signupandlogin.createexpressUser );

router.post("/login", signupandlogin.signexpressUser);

module.exports = router;
