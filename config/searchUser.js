var User = require('../app/models/user')

//looks for users with firstname or last name similar to query(s)
module.exports = function(query){
	var queries = query.split(' ');
	for(i=0;i<queries.length;i++){
		queries[i]= new RegExp(queries[i], 'i');
	}
	//used regex so case of letters doesnt matter
	var temp = User.find({}).or([{'lastname': {$in: queries}},
		{'firstname': {$in: queries}}]);

	return temp;

}	
