var express = require('express');
var router = express.Router();


const User =require('../models/userschema');
const passport=require("passport");
const LocalStrategy =require("passport-local");


passport.use(new LocalStrategy(User.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get("/register",function(req,res,next){
  res.render("register",{})
})

router.post("/register-user",async function(req,res,next){
  try {
    // only for save data----
    // const newUser = new User(req.body);
    // await newUser.save();

    // for passport use and for register a user-
    const{username,email,name ,password}=req.body;
    await User.register({name,username,email},password);
    res.redirect("/login");
} catch (error) {
    res.send(error);
}
});


router.get("/login",function(req,res,next){
  res.render("login",{})
})
// login router---------------
router.post("/login-user",
    passport.authenticate("local", 
    {
       successRedirect:"/profile",
       failureRedirect:"/login",
    }),
     function(req,res,next){}
)

router.get("/about",function(req,res,next){
  res.render("about",{})
});

router.get("/profile",isLoggedIn, function (req, res, next) {
  res.render("profile");
  });

router.get("/logout-user",function(req,res,next){
  req.logout(()=>{
    res.redirect("/login");
  })
 
})  

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else{
    res.redirect("/login");
  }
 
}




module.exports = router;
