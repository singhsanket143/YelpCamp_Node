var express = require("express");

var app = express();

var bodyparser = require("body-parser");

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyparser.urlencoded({extended: true})); // To initialize bodyparser

app.set("view engine", "ejs"); // To set the default html embedded enjine to ejs

// Schema Setup
var campgroundSchema = new mongoose.Schema({
    // BluePrint for the database
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema); // compiling the schema into a model
// Campground.create(
//     {
//         name: "Mountain Goat's Rest",
//         image: "http://s3.amazonaws.com/digitaltrends-uploads-prod/2017/06/camping-tent-1500x1000.png"
//     }, function (err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Newly Created CAMPGROUND");
//         }
//     }
// );


app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    // Find all the campgrounds from the DataBase
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds})
        }
    });
});

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    // Create a new campground with the database
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    // campgrounds.push(newCampground);

});

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});

app.listen(3000, function () {
    console.log("Yelp Camp Server Has Started");
});