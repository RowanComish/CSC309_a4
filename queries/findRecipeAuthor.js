
var Recipe = require('../app/models/recipes');

module.exports =function(recipe_id){
	//get info about the author of a recipe
	var temp = Recipe.findOne({'_id' : recipe_id}).populate('author_id');
	return temp;

}