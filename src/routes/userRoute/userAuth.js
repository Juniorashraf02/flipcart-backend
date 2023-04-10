const express = require("express");
const { signup, signin } = require("../../controller/user/userAuth");
const router = express.Router();

//? @api  [post]   [signup]  all the data is posted to database through this
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
