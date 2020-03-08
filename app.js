var express = require("express");

var app = express();

app.set("view engine","ejs");

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
    
    var campgrounds = [
        {name: "Lets Campout", image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
        {name: "Pawna Lake", image: "https://images.unsplash.com/photo-1563299796-17596ed6b017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
        {name: "Bhandardara lake", image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
    ]

    res.render("campgrounds", {campgrounds:campgrounds});

});


app.listen("3000", process.env.IP, function(){
    console.log("Server Started");
});