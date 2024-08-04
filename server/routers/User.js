const express = require("express");
const router = express.Router();

const {
  login,
  signUp,
  sendOtp,
  changePassword,
} = require("../controllers/Auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

const { auth } = require("../middlewares/auth");

//routes for user login
router.post("/login", login);

//routes for user signup
router.post("/signup", signUp);

//route for sending otp to the user's email
router.post("/sendotp", sendOtp);

//route for the changing the password
router.post("/changePassword", changePassword);

//reset password
//route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

//route for resetting user's password after verification
router.post("/reset-password", resetPassword);

//export the router
module.exports = router;
