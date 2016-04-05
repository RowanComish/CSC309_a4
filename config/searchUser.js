var User = require('../app/models/user')

//looks for users with firstname or last name similar to query
module.exports = function(query){
	
	//used regex so case of letters doesnt matter
	var temp = User.find({}).or([{'lastname': new RegExp(query, 'i')},
		{'firstname': new RegExp(query, 'i')}]);

	/*temp.exec(function(err, users){
			if(err){
				console.log('error')
				callback(err, null);
			}else{
				callback(null, users);
			}		
	});*/
	return temp;

}	
