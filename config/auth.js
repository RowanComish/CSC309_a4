// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '970715626298930', // your App ID
        'clientSecret'  : 'd4f179360930b2a9c3a91a917cc5ad5c', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    }

};