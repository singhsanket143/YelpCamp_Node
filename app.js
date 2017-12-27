var express = require("express");

var app = express();

var bodyparser = require("body-parser");

var mongoose = require("mongoose");

var Campground = require('./models/campgrounds');

var Comment = require('./models/comments');

var passport = require('passport');

var localStratergy = require('passport-local');

var User = require('./models/user');

var seedDB = require('./seeds');

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyparser.urlencoded({extended: true})); // To initialize bodyparser

app.set("view engine", "ejs"); // To set the default html embedded enjine to ejs

app.use(express.static(__dirname + "/public"));

var campgroundRoutes = require('./routes/campgrounds');
var commentRoutes = require('./routes/comments');
var indexRoutes = require('./routes/index');

seedDB;

// PassPort config
app.use(require("express-session")({
    secret: 'Ruby on rails is better than node.js',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});
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

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);
app.listen(3000, function () {
    console.log("Yelp Camp Server Has Started");
});