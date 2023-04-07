const express = require('express');
const { signup } = require('../../controller/user/userAuth');
const router = express.Router();

//? @api  [post]   [signup]  all the data is posted to database through this
router.post('/signup', signup);

module.exports = router;