var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds")

   
mongoose.connect("mongodb://localhost/campground");    

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");
seedDB(); 


app.get("/", function(req,res){
    res.render("landing");
});

//INdex Route
app.get("/campgrounds", function(req,res){
    // Getting campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });

    //res.render("campgrounds", {campgrounds:campgrounds});

});

app.post("/campgrounds", function(req,res){
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

//New Route
app.get("/campgrounds/new", function(req,res){
    res.render("campgrouds/new.ejs");
});

//SHOW Route
app.get("/campgrounds/:id", function(req, res){
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

//Comments ROute

app.get("/campgrounds/:id/comments/new", function(req,res){
    //finding campground by id 
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
    

});


app.listen("3000", process.env.IP, function(){
    console.log("Server Started");
});