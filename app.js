var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
//app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.set("view engine","ejs");


//app.get('/bootstrap.min.js', function(req, res) {
//res.sendFile(__dirname + '/node_modules/bootstrap/dist/bootstrap.min.js');
//});

var campgrounds = [
    {name: "Lets Campout", image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name: "Pawna Lake", image: "https://images.unsplash.com/photo-1563299796-17596ed6b017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name: "Bhandardara lake", image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
]

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
    
    res.render("campgrounds", {campgrounds:campgrounds});

});

app.post("/campgrounds", function(req,res){
    //getting data from the form 
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);

    //redirecting to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});

app.listen("3000", process.env.IP, function(){
    console.log("Server Started");
});