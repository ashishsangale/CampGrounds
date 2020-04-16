var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    app = express(),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user")
    seedDB = require("./seeds")


//Passport Config
app.use(require('express-session')({
    secret: 'hello there',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Mongoose COnnection   
mongoose.connect("mongodb://localhost/campground");    

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"))
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

app.post("/campgrounds/:id/comments", function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    })
});

//Auth Route
app.get("/register", function(req,res){
    res.render('register')
});

//login logic
app.post("/register", function(req, res){
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


app.listen("3000", process.env.IP, function(){
    console.log("Server Started");
});
