const User = require("../models/user");

module.exports.signupUser =  (req, res) => {
  res.render("users/signup.ejs");
}

module.exports.signupUpdate = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registerUser = await User.register(newUser, password);
      console.log(registerUser);
      req.login(registerUser, (err) => {
        if (err) {
          next(err);
        }
        req.flash("success", "welcome to wonderlust");
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }


  module.exports.loginUser =  (req, res) => {
    res.render("users/login.ejs");
  }

  module.exports.loginUpdate = async (req, res) => {
    req.flash("success", "Create New Listing");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }

  module.exports.logoutUser = (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "logged you out!");
      res.redirect("/listings");
    });
  }