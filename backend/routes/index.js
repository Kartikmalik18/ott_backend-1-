const express = require('express');

const router = express.Router()

const userSignUpController = require('../controller/userSignUp')
const userSignInController = require('../controller/userSignIn');
const authToken = require('../middleware/authToken');





router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);




module.exports = router;