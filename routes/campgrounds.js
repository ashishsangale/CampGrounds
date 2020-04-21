
//======================================================================================
//          CAMPGROUND ROUTES
//======================================================================================
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INdex Route
router.get("/", function(req,res){
    // Getting campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
        }
    });

    //res.render("campgrounds", {campgrounds:campgrounds});

});

router.post("/",isLoggedIn, function(req,res){
    //getting data from the form 
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    } 
    var newCampground = {name: name, image: image, description:description, author:author}

    
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else {
            //redirecting to campgrounds page
            console.log(newlyCreated)
            res.redirect("/campgrounds");
        }
    });
    
});

//New Route--> adding new campground
router.get("/new",isLoggedIn, function(req,res){
    res.render("campgrounds/new.ejs");
});

//SHOW Route--> displaying campgrounds
router.get("/:id", function(req, res){
    //finding campgrounds by id
    Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            //render show template
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});

//edit route
router.get("/:id/edit", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err)
            res.redirect("/campgrounds")
        } else {
            res.render("campgrounds/edit",{campground: foundCampground });
        }
    })
    
});

//update route
router.put("/:id", function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

module.exports = router;