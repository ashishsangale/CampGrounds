var mongoose = require('mongoose');

//setting up schema
var CampgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

module.exports = mongoose.model("Campground", CampgroundSchema);

