const express = require('express');
const router = express.Router();

//Deconstructing
const {register, login, forgotpassword, resetpassword} = require('../controllers/auth');

//Routes with functions

//POST requests
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotpassword);

//PUT Requests
router.route("/resetpassword/:resetToken").put(resetpassword);


module.exports = router;