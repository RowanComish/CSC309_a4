var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

        firstname    : String,
        lastname     : String,
        email        : String,
        password     : String,
        phonenumber : Number,
        streetaddress  : String,
        city         : String,
        province     : String,
        postalcode   : String,
        country      : String,
        fb_id        : String,
        fb_token     : String,
        date         : String,
        fav_cuisine  :[String],
        admin        : Boolean
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);