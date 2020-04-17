//======================================================================================
//          AUTHENTICATION ROUTES
//======================================================================================
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
//Auth Route
router.get("/register", function(req,res){
    res.render('register')
});
 
//login logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err) 
            console.log("!!!!!!")
            return res.redirect("/register")
        } 
        passport.authenticate("local")(req,res, function(){
            res.redirect("/campgrounds")
            
        }); 
    });
});

//login
router.get("/login", function(req,res){
    res.render('login')
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
    res.redirect("/")
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

module.exports = router;