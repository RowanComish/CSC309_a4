var Recipe = require('../app/models/recipes');

module.exports = function(query){
	
	//used regex so case of letters doesnt matter
	var temp = Recipe.find({}).or([{'name': new RegExp(query, 'i')},
		{'cuisine': new RegExp(query, 'i')},
		{'category': new RegExp(query, 'i')}]).sort({'review_avg': -1});
	
	/*temp.exec(function(err, recipes){
		if(err){
				console.log('error')
				callback(err, null);
			}else{
				callback(null, recipes);
			}		
	});
	*/
	return temp;
}