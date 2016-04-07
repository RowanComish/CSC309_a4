var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our recipe model
var recipeSchema = mongoose.Schema({
        _id: Number,
        name : String,
        author_id : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        cuisine : String,
        category : String,
        type: String,
        cost : Number,
        description: String,
        review_avg : Number,
        rating : [Number],
        date: { type: Date, default: Date.now }
});

// create the model for recipes and expose it to our app
module.exports = mongoose.model('recipes', recipeSchema);