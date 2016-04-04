
var User = require('../app/models/user');

module.exports = function(query){
	var result;
	var temp = User.find({}).where('firstname').equals(query);
	return temp;
}	