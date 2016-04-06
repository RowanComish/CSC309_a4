var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our comment model
var identitySchema = mongoose.Schema({
        current : Number //If responding to a previous comment or not!
});

// create the model for comment and expose it to our app
module.exports = mongoose.model('identitycounters', identitySchema);