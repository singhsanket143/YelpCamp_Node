var express = require("express");

var app = express();

var bodyparser = require("body-parser");

var mongoose = require("mongoose");

var Campground = require('./models/campgrounds');

var seedDB = require('./seeds');

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyparser.urlencoded({extended: true})); // To initialize bodyparser

app.set("view engine", "ejs"); // To set the default html embedded enjine to ejs

seedDB;

// compiling the schema into a model
Campground.create(
    {
        name: "Sanket Singh",
        image: "http://s3.amazonaws.com/digitaltrends-uploads-prod/2017/06/camping-tent-1500x1000.png",
        description: "This is a huge Granite hill, no Bathrooms, no water. Beautiful Granite!"
    }, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("Newly Created CAMPGROUND");
        }
    }
);


app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    // Find all the campgrounds from the DataBase
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds})
        }
    });
});

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
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

// Show form to create new campground
app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id",function (req,res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show",{campground: foundCampground});
        }
    })
});

// ===============
// Comments Routes
// ===============

app.get('/campgrounds/:id/comments/new',function (req,res) {
    res.render("comments/new");
});

app.listen(3000, function () {
    console.log("Yelp Camp Server Has Started");
});