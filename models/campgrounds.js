var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
    // BluePrint for the database
    name: String,
    image: String,
    description: String
});

module.exports = mongoose.model("Campground", campgroundSchema);