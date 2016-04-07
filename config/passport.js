
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var User            = require('../app/models/user');

// load the auth variables
var configAuth = require('./auth');

// expose this function to our app using module.exports
module.exports = function(passport) {

        // used to serialize the user for the session
        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });

        // used to deserialize the user
        passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
                done(err, user);
            });
        });

        //LOCAL LOGIN
        passport.use('local-login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, email, password, done) { 

            User.findOne({ 'email' :  email }, function(err, user) {

                if (err)
                    return done(err);

                else if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user with that email. Please enter the correct email'));

                //if user logged in with facebook and did not set password
                else if(!user.password)
                    return done(null,false,req.flash('loginMessage', 'Password not set, please login using Facebook and set password'));

                // if the user is found but the password is wrong
                else if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                else
                    return done(null, user);
            });

        }));

        passport.use('local-login2', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, email, password, done) { 

            User.findOne({ 'email' :  email }, function(err, user) {

                if (err)
                    return done(err);

                else if (!user)
                    return done(null, false, req.flash('loginMessage', 'No admin with that email. Please enter the correct email'));

                //if user logged in with facebook and did not set password
                else if(!user.password)
                    return done(null,false,req.flash('loginMessage', 'Password not set, please login using Facebook and set password'));

                // if the user is found but the password is wrong
                else if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                
                else if (user.admin==false)
                    return done(null, false, req.flash('loginMessage', 'User does not have admin privileges.'));
                else
                    return done(null, user);
            });

        }));
        
        //LOCAL SIGNUP
        passport.use('local-signup', new LocalStrategy({

            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, email, password, done) {

            User.findOne({ 'email' :  email }, function(err, user) {

                if (err)
                    return done(err);

                //check if email already exists

                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                }

                else {

                    // if there is no user with that email
                    // create the user

                    var newUser            = new User();

                    newUser.firstname = req.body.firstname;
                    newUser.lastname = req.body.lastname;
                    newUser.email = email;
                    newUser.password = newUser.generateHash(password); 
                    newUser.phonenumber = req.body.phonenumber;
                    newUser.streetaddress = req.body.streetaddress;
                    newUser.city = req.body.city;
                    newUser.province = req.body.province;
                    newUser.postalcode = req.body.postalcode;
                    newUser.country = req.body.country;
                    newUser.fav_cuisine[0] = req.body.cuisine1;
                    newUser.fav_cuisine[1] = req.body.cuisine2;
                    newUser.fav_cuisine[2] = req.body.cuisine3;

                    if(req.body.firstname == 'admin' && req.body.lastname == 'admin')
                        newUser.admin = true;
                    else
                        newUser.admin = false;


                    var now = Date.now();
                    var d = new Date(now);
                    var date = d.getDate() + '-' + (d.getMonth()+1) +  '-' + d.getFullYear();
                    newUser.date = date;

                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        }));

        // FACEBOOK 
        passport.use(new FacebookStrategy({

            clientID        : configAuth.facebookAuth.clientID,
            clientSecret    : configAuth.facebookAuth.clientSecret,
            callbackURL     : configAuth.facebookAuth.callbackURL,
            profileFields: ['id', 'name', 'emails'],
            passReqToCallback : true

        },

        // facebook will send back the token and profile
        function(req, token, refreshToken, profile, done) {

            process.nextTick(function() {

                User.findOne({ 'fb_id' : profile.id }, function(err, user) {

                    if (err)
                        return done(err);

                    else if (!user) {

                        // if there is no user, create them
                        var newUser            = new User();

                        newUser.fb_id = profile.id;
                        newUser.fb_token = token;
                        newUser.firstname = profile.name.givenName 
                        newUser.lastname = profile.name.familyName;
                        newUser.email = profile.emails[0].value;
                        var now = Date.now();
                        var d = new Date(now);
                        var date = d.getDate() + '-' + (d.getMonth()+1) +  '-' + d.getFullYear();
                        newUser.date = date;

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                
                    else
                        return done(null, user);
                });
            });
        }));
};