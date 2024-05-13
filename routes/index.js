var express = require("express");
var router = express.Router();

const User = require("../models/userschema");
const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.use(new LocalStrategy(User.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { user: req.user });
});

router.get("/register", function (req, res, next) {
  res.render("register", { user: req.user });
});

router.post("/register-user", async function (req, res, next) {
  try {
    // only for save data----
    // const newUser = new User(req.body);
    // await newUser.save();

    // for passport use and for register a user-
    const { username, email, name, password } = req.body;
    await User.register({ name, username, email }, password);
    res.redirect("/login");
  } catch (error) {
    res.send(error);
  }
});

router.get("/login", function (req, res, next) {
  res.render("login", { user: req.user });
});
// login router---------------
router.post(
  "/login-user",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  function (req, res, next) {}
);

router.get("/about", function (req, res, next) {
  res.render("about", { user: req.user });
});

router.get("/profile", isLoggedIn, function (req, res, next) {
  res.render("profile", { user: req.user });
});

router.get("/update-user/:id", isLoggedIn, function (req, res, next) {
  res.render("userupdate", { user: req.user });
});
router.get("/reset-password/:id", isLoggedIn, function (req, res, next) {
  res.render("resetpassword", { user: req.user });
});
router.post("/reset-password/:id", isLoggedIn, async function (req, res, next) {
  try {
    await req.user.changePassword(req.body.oldpassword, req.body.newpassword);
    req.user.save();
    res.redirect(`/update-user/${req.user._id}`);
  } catch (error) {
    res.send(error);
  }
});

router.get("/logout-user", function (req, res, next) {
  req.logout(() => {
    res.redirect("/login");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
