var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our order model
var orderSchema = mongoose.Schema({

        user_id : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        recipe_id :  {type: mongoose.Schema.Types.ObjectId, ref: 'Recipes'},
        cost : Number,
        date : String

});

// create the model for orders and expose it to our app
module.exports = mongoose.model('Order', orderSchema);