var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user")
    seedDB = require("./seeds")

var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    authRoutes = require("./routes/auth");

//Mongoose COnnection   
//mongoose.connect("mongodb://localhost/campground", {useNewUrlParser: true, useUnifiedTopology: true});

var url = process.env.DATABASEURL || "mongodb://localhost/campground"

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true},function(){
    console.log("connnected")
});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash()); 
//seedDB();


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
 
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success")
    next(); 
})

//requiring routes
app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.get("/", function(req,res){
    res.render("landing");
});
 
app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Server Started");
});
