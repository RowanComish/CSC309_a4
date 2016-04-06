var Review = require('../app/models/reviews')

//finds the reviews for a given recipe
module.exports = function(recipeID, lastID){
    
    var limitNumreviews = 10;
    
    // Retrieve n reviews for recipe with ID less than lastID sorted by most recent
	var reviews = Review.find({'id':recipeID, '_id' : {$lt: lastID }}).sort( [['_id', -1]] ).limit(limitNumreviews);

	return reviews;
}	