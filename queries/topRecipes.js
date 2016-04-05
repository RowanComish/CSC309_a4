var Recipe = require('../app/models/recipes')

//finds the top 3 recipes based off of reviews 
module.exports = function(){
	
	var temp = Recipe.find({}).sort({'review_avg': -1}).limit(3);

	return temp;

}