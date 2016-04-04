var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our comment model
var commentSchema = mongoose.Schema({

        comment : String, 
        recipe_id : {type: mongoose.Schema.Types.ObjectId, ref: 'Recipes'},
        parent_id : Number //If responding to a previous comment or not!

});

// create the model for comment and expose it to our app
module.exports = mongoose.model('Comment', commentSchema);