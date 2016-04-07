var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our order model
var ratingSchema = mongoose.Schema({
    recipe_id : {type: Number, ref: 'recipes'},
    count: Number,
    rating:[Number],
    total: Number
});

// create the model for orders and expose it to our app
module.exports = mongoose.model('Rating', ratingSchema);