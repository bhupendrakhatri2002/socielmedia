var express = require('express');
var router = express.Router();


const User =require('../models/userschema');
const passport=require("passport");
const LocalStrategy =require("passport-local");


passport.use(new LocalStrategy(User.authenticate));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/about",function(req,res,next){
  res.render("about",{})
})
router.get("/login",function(req,res,next){
  res.render("login",{})
})
router.get("/register",function(req,res,next){
  res.render("register",{})
})
router.post("/register-user",async function(req,res,next){
  try {
    // only for save data----
    // const newUser = new User(req.body);
    // await newUser.save();

    // for passport use and for register a user-
    const{username,email,name ,password}=req.body
    await User.register({name,username,email},password)
    res.redirect("/login");
} catch (error) {
    res.send(error);
}
});

router.get("/about", function (req, res, next) {
res.render("about");
})

router.get("/profile", function (req, res, next) {
  res.render("profile");
  })

module.exports = router;
