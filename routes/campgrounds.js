
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

router.post("/", function(req,res){
    //getting data from the form 
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description; 
    var newCampground = {name: name, image: image, description:description}
    
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else {
            //redirecting to campgrounds page
            res.redirect("/campgrounds");
        }
    });
    
});

//New Route--> adding new campground
router.get("/new", function(req,res){
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

module.exports = router;