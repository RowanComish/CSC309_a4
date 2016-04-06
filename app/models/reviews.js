var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our reviews model
var reviewsSchema = mongoose.Schema({

        type : { type: String, enum: ['User', 'Recipe'] }, //It's a review of a user or a recipe!
        recipeID : Number, //This should be the id of whatever the user is reviewing!
        userID : {type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ID of the user that left this review
        score: Number,
        title : String,
        comment : String,
        postDate : { type: Date, default: Date.now }

});

// create the model for reviews and expose it to our app
module.exports = mongoose.model('Reviews', reviewsSchema);