var User = require('../app/models/user')

//finds the top 3 users based off of reviews
module.exports = function(){
	
	var temp = User.find({}).sort({'review_avg': -1}).limit(3);

	return temp;

}	