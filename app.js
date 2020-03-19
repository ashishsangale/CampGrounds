var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")


mongoose.connect("mongodb://localhost/campground");    

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");


//setting up schema
var CampgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", CampgroundSchema);

//Campground.create({
//    name: "Bhandardara lake",
//    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
//}, function(err, campground){//
//    if(err){
//        console.log(err)
//    } else {
//        console.log(campground)
//    }

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
            res.render("campgrounds", {campgrounds:allCampgrounds});
        }
    });

    //res.render("campgrounds", {campgrounds:campgrounds});

});

app.post("/campgrounds", function(req,res){
    //getting data from the form 
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    
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

app.listen("3000", process.env.IP, function(){
    console.log("Server Started");
});