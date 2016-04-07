
var Recipe = require('../app/models/recipes');

module.exports =function(recipe_id){
	//simple find recipe query
	var temp = Recipe.findOne({'_id' : recipe_id});
	return temp;

}