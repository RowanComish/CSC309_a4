var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our recipe model
var recipeSchema = mongoose.Schema({

        name : String,
        author_id : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        cuisine : String,
        category : String,
        cost : Number,
        Ingredients : [ 
        {
            name: String,
            description: String
        }
        ],
        description: String,
        review_avg : Number

});

// create the model for recipes and expose it to our app
module.exports = mongoose.model('Recipes', recipeSchema);