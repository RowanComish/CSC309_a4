var User = require('../app/models/user')

//looks for users with firstname or last name similar to query(s)
module.exports = function(query){
	
	if(query && !(query instanceof Array)){
		var queries = query.split(' ');
	}
	if(query instanceof Array){
		queries = query;
	}
	else{
		queries = []
	}
	
	for(i=0;i<queries.length;i++){
		queries[i]= new RegExp(queries[i], 'i');
	}
	//used regex so case of letters doesnt matter
	var temp = User.find({}).or([{'lastname': {$in: queries}},
		{'firstname': {$in: queries}}]).sort({'review_avg': -1});

	return temp;

}	
