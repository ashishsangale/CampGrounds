//======================================================================================
//          AUTHENTICATION  ROUTES
//======================================================================================
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
//Auth Route
router.get("/register", function(req,res){
    res.render('register', {page: 'register'});
});
 
//login logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error",err.message); 
            console.log("!!!!!!")
            return res.redirect("/register")
        } 
        passport.authenticate("local")(req,res, function(){
            req.flash("success", "Welcome to Campgrounds " + user.username)
            res.redirect("/campgrounds")
            
        }); 
    });
});

//login
router.get("/login", function(req,res){
    res.render('login', {page: 'login'});
});

router.post("/login", passport.authenticate("local",
{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}), function(req, res){

});


//logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out")
    res.redirect("/campgrounds")
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

module.exports = router;