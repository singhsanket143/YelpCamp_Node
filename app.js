var express = require("express");
var app = express();
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
var campgrounds = [
    {name: "Salmon Creek", image: "https://cdn.grindtv.com/uploads/2015/02/shutterstock_242371765.jpg"},
    {name: "Granite Hill", image: "http://jaguarccc.co.uk/wp-content/uploads/2016/12/about.jpg"},
    {
        name: "Mountain Goat's Rest",
        image: "http://s3.amazonaws.com/digitaltrends-uploads-prod/2017/06/camping-tent-1500x1000.png"
    }
];
app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {

    res.render("campgrounds", {campgrounds: campgrounds})
});

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
})
app.listen(3000, function () {
    console.log("Yelp Camp Server Has Started");
});