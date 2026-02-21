const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { isLogged, saveRedirectUrl } = require("../Middleware.js");
const {
  signupUser,
  loginUser,
  loginUpdate,
  logoutUser,
  signupUpdate,
} = require("../controllers/user.js");

router.route("/signup").get(signupUser).post(wrapAsync(signupUpdate));

router
  .route("/login")
  .get(loginUser)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    loginUpdate,
  );

router.get("/logout", logoutUser);

module.exports = router;
