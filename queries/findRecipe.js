
var Recipe = require('../app/models/recipes');

module.exports =function(recipe_id){

	var temp = Recipe.findOne({'_id' : recipe_id});
	return temp;

}