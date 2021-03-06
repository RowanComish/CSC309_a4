var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our order model
var orderSchema = mongoose.Schema({

        user_id : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        recipe_id :  {type: Number, ref: 'recipes'},
        date: { type: Date, default: Date.now },
        queue: { type: Boolean, default: true },
        review_id : {type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' , default: null} // ID of the review for this order

});

// create the model for orders and expose it to our app
module.exports = mongoose.model('Order', orderSchema);