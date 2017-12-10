var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
    // BluePrint for the database
    name: String,
    image: String,
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

module.exports = mongoose.model("Campground", campgroundSchema);