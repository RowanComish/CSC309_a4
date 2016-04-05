var Recipe = require('../app/models/recipes');

module.exports = function(query){
	//takes in a query and changes it to individual words as regex
	if(query){
		var queries = query.split(' ');
	}else{
		queries = []
	}
	for(i=0;i<queries.length;i++){
		queries[i]= new RegExp(queries[i], 'i');
	}
	
	var temp = Recipe.find({}).or([{'name': {$in: queries}},
		{'cuisine': {$in: queries}},
		{'category': {$in: queries}}]).sort({'review_avg': -1});
	
	return temp;
}