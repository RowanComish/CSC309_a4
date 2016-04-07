var assert = require('assert');
var mongoose = require('mongoose');
var User = require("../app/models/user.js");
var db;

var request = require('superagent');
var agent = request.agent();


describe('Account', function() {

describe('Account creation and fetching', function() {

before(function(done) {
 db = mongoose.connect('mongodb://user:csc309a4@jello.modulusmongo.net:27017/v7ygeHux');
  done();
 });

 after(function(done) {
   mongoose.connection.close();
   done();
 });

 beforeEach(function(done) {
  var account = new User({
    email: 'mocha@mocha.com',
    password: 'mocha',
    admin : false
  });

  account.save(function(error) {
    if (error) console.log('error' + error.message);
    else console.log('no error');
    done();
   });
 });

 it('find a user by email', function(done) {
    User.findOne({ email: 'mocha@mocha.com' }, function(err, account) {
    	assert.equal(account.email, 'mocha@mocha.com')
      done();
      
    });
    //done();
 });

  it('successfully determine user is not admin', function(done) {
    User.findOne({ email: 'mocha@mocha.com' }, function(err, account) {
    	assert.equal(account.admin, false);
      done();
      
    });
  });

    it('successfully determine user is admin', function(done) {
    User.findOne({ email: 'admin@feed.com' }, function(err, account) {
      assert.equal(account.admin, true);
      done();
      
    });
    //done();
 });


 afterEach(function(done) {
    User.remove({email: 'mocha@mocha.com'}, function() {
      done();
    });
 });

});
});


describe('Login', function() {
	

  it ('Successful Login should redirect to profile', function(done) {
    agent.post('http://127.0.0.1:3000/login')
      .send({ email: 'admin@feed.com', password: 'admin123' })
      .end(function(err, res) {
      if (err) console.log('error' + err.message);
        assert.equal(res.redirects[0],'http://127.0.0.1:3000/profile');

        done();
      });
  });

  it ('Incorrect password Login should redirect to login', function(done) {
    agent.post('http://127.0.0.1:3000/login')
      .send({ email: 'admin@feed.com', password: 'admin122' })
      .end(function(err, res) {
      if (err) console.log('error' + err.message);
        assert.equal(res.redirects[0],'http://127.0.0.1:3000/login');

        done();
      });
  });

  it ('Non existing email Login should redirect to login', function(done) {
    agent.post('http://127.0.0.1:3000/login')
      .send({ email: 'admi@feed.com', password: 'admin123' })
      .end(function(err, res) {
      if (err) console.log('error' + err.message);
        assert.equal(res.redirects[0],'http://127.0.0.1:3000/login');

        done();
      });
  });

  it ('signup', function(done) {
    agent.post('http://127.0.0.1:3000/signup')
      .send({ email: 'lulu@feed.com', password: 'lulu12333' })
      .end(function(err, res) {
      if (err) console.log('error' + err.message);
        assert.equal(res.redirects[0],'http://127.0.0.1:3000/signup');

        done();
      });
  });

});
