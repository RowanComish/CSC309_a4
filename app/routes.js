// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {

        if (req.isAuthenticated())
            res.render('index.ejs', { user: req.user , message: 'loggedin' } ); // load the index.ejs file
        else
            res.render('index.ejs', { user: req.user , message: 'notloggedin' } ); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        if (req.isAuthenticated())
            res.redirect('/');
        else
            res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/editprofile', isLoggedIn, function(req, res) {
        res.render('editprofile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.post('/editprofile', function (req, res) {
        //res.send('POST request to the homepage');

        var User = require('../app/models/user');

        User.findOne({ 'local.username' :  req.user.local.username }, function(err, user) {
            var current = req.user.local ;
            var body = req.body;
            if(body.firstname!="")
                current.firstname = body.firstname;
            if(body.lastname!="")
                current.lastname = body.lastname;
            if(body.email="")
                current.email=body.email;
            if(body.phonenumber="")
                current.phone_number=body.phonenumber;
            if(body.streetaddress="")
                current.str_address=body.streetaddress;
            if(body.city="")
                current.city=body.city;
            if(body.province="")
                current.province=body.province;
            if(body.postalcode="")
                current.postalcode=body.postalcode;
            if(body.country="")
                current.country=body.country;


            req.user.save(function(err) {
                if (err)
                    throw err;
            });

        });

        setTimeout(function(){

            res.redirect('/profile');}, 200);

        
    });

    app.get('/changepass', isLoggedIn, function(req, res) {
        res.render('changepass.ejs', {
            user : req.user  , message: "" // get the user out of session and pass to template
        });
    });

    app.get('/changepass2', isLoggedIn, function(req, res) {
        res.render('changepass.ejs', {
            user : req.user  , message: "Current password is incorrect" // get the user out of session and pass to template
        });
    });

    app.post('/changepass', function (req, res) {
        //res.send('POST request to the homepage');

        var User = require('../app/models/user');

        var already = false;

        User.findOne({ 'local.username' :  req.user.local.username }, function(err, user) {


            var current = req.user.local ;
            var body = req.body;

            if (!user.validPassword(body.oldpassword)){


                already = true;

            } else {

            current.password = req.user.generateHash(body.newpassword);


            req.user.save(function(err) {
                if (err)
                    throw err;
            });
            }

            if(already==false){
            setTimeout(function(){res.redirect('/profile');}, 200);
            }
         else
            res.redirect('/changepass2');


        });
        
    });



    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
    app.get('/connect/local', function(req, res) {
        res.render('connect-local.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

        // =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', function(req, res) {
        var user            = req.user;
        user.local.username    = undefined;
        user.local.firstname   = undefined;
        user.local.lastname    = undefined;
        user.local.email       = undefined;
        user.local.password    = undefined
        user.local.phone_number   = undefined;
        user.local.str_address    = undefined;
        user.local.city           = undefined;
        user.local.province       = undefined;
        user.local.postalcode     = undefined;
        user.local.country        = undefined;
        user.local.DOB            = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};


// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}