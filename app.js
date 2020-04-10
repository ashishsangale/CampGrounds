var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")
    Campground = require("./models/campgrounds")

mongoose.connect("mongodb://localhost/campground");    

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");


//Campground.create({
//    name: "Bhandardara lake",
//    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//    description: "test1111"
//
//}, function(err, campground){//
//    if(err){
//        console.log(err)
//    } else {
//        console.log(campground)
//    }
//
//});


app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
    // Getting campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render("index", {campgrounds:allCampgrounds});
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

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
    //finding campgrounds by id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            //render show template
            res.render("show", {campground: foundCampground});
        }
    });

    
});

app.listen("3000", process.env.IP, function(){
    console.log("Server Started");
});