var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our reviews model
var reviewsSchema = mongoose.Schema({

        type : { type: String, enum: ['User', 'Recipe'] }, //It's a review of a user or a recipe!
        id : Number, //This should be the id of whatever the user is reviewing!
        score: Number,
        title : String,
        comment : String

});

// create the model for reviews and expose it to our app
module.exports = mongoose.model('Reviews', reviewsSchema);